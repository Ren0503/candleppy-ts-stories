import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { EmailRegex, ErrorCodes, ErrorMessages } from '../constants';
import { AuthUser } from '../interface';
import { createUser, getAuthUser, getUserById, getUsers } from '../queries';

const UserController = {
    user: async (req: Request, res: Response): Promise<any> => {
        const { id } = req.params;
        const user = await getUserById(id);
        return res.json(user);
    },
    getUsers: async (req: Request, res: Response): Promise<any> => {
        const users = await getUsers();
        return res.json(users);
    },
    signup: async (req: Request, res: Response): Promise<any> => {
        const { fullName, username, email, password } = req.body;

        if (!fullName || !email || !password) {
            return res.status(ErrorCodes.Bad_Request).send('Please fill in all of the fields.');
        }

        if (!email.match(EmailRegex)) {
            return res.status(ErrorCodes.Bad_Request).send('The email address is not valid.');
        }

        const existingUser = await getAuthUser(email);

        if (existingUser) {
            return res.status(ErrorCodes.Bad_Request).send('The email address is already being used.');
        }

        try {
            const user = await createUser(fullName, username, email, password);
            const token = jwt.sign({ user: { userId: user._id, email } }, process.env.SECRET, { expiresIn: '1h' });

            return res.json({
                _id: user._id,
                username: user.username,
                email: user.email,
                avatar: user.avatar,
                isAdmin: user.isAdmin,
                token
            })
        } catch (error) {
            res.send(ErrorCodes.Un_Authorized).send(ErrorMessages.Generic);
        }
    },
    login: async(req: Request, res: Response): Promise<any> => {
        const { email, password } = req.body;

        const user = await getAuthUser(email);

        if (user && (await user.isValidPassword(password))) {
            const token = jwt.sign({ user: { userId: user._id, email } }, process.env.SECRET, { expiresIn: '1h' });

            res.json({
                _id: user._id,
                username: user.username,
                email: user.email,
                avatar: user.avatar,
                isAdmin: user.isAdmin,
                token,
            });
        }
    },
    getProfile: async(req: Request, res: Response): Promise<any> => {
        const authUser = req.user as AuthUser;
        const user = await getUserById(authUser?._id);
        return res.json(user)
    }
}