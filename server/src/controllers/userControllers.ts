import asyncHandler from 'express-async-handler';

import { User } from '../models';
import { generateToken } from '../utils/generateToken';
import { Request, Response } from '../types';

export const login = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body as { email: string; password: string };

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

export const register = asyncHandler(
    async (req: Request, res: Response) => {
        const { name, email, password } = req.body as {
            name: string;
            email: string;
            password: string;
        };

        const userExists = await User.findOne({ email });

        if (userExists) {
            res.status(400);
            throw new Error('User already exists');
        }

        const user = new User({
            name,
            email,
            password
        });

        await user.save();

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            });
        } else {
            res.status(400);
            throw new Error('Invalid user data');
        }
    }
);

export const getUserProfile = asyncHandler(
    async (req: Request, res: Response) => {
        const user = await User.findById(req.user?._id);
        if (user) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                isAdmin: user.isAdmin,
                bio: user.bio,
            });
        } else {
            throw new Error('User not found');
        }
    }
);

export const updateUserProfile = asyncHandler(
    async (req: Request, res: Response) => {
        const user = await User.findById(req.user?._id);

        if (user) {
            const { name, email, password, avatar, bio } = req.body as {
                name?: string;
                email?: string;
                password?: string;
                avatar?: string;
                bio?: string
            };

            user.name = name ? name : user.name;
            user.email = email ? email : user.email;
            user.avatar = avatar ? avatar : user.avatar;
            user.bio = bio ? bio : user.bio;

            if (password) user.password = password;
            const updatedUser = await user.save();

            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                isAdmin: updatedUser.isAdmin,
                avatar: updatedUser.avatar,
                bio: updatedUser.bio,
                token: generateToken(updatedUser._id)
            });
        } else {
            res.status(404);
            throw new Error('User not found');
        }
    }
);

export const getUsers = asyncHandler(
    async (req: Request, res: Response) => {
        const users = await User.find({}).select('-password');
        res.json(users);
    }
);

export const getUserById = asyncHandler(
    async (req: Request, res: Response) => {
        const { id } = req.params as { id: string };
        const user = await User.findById(id).select('-password');
        if (user) {
            res.json(user);
        } else {
            throw new Error('User not found');
        }
    }
);

export const updateUser = asyncHandler(
    async (req: Request, res: Response) => {
        const { id } = req.params as { id: string };
        const user = await User.findById(id);
        if (user) {
            const { name, email, isAdmin } = req.body as {
                name?: string;
                email?: string;
                isAdmin?: boolean;
            };
            user.name = name ? name : user.name;
            user.email = email ? email : user.email;
            if (isAdmin) user.isAdmin = isAdmin;

            const updatedUser = await user.save();
            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                isAdmin: updatedUser.isAdmin
            });
        } else {
            res.status(404);
            throw new Error('User not found');
        }
    }
);

export const deleteUser = asyncHandler(
    async (req: Request, res: Response) => {
        const { id } = req.params as { id: string };
        const user = await User.findById(id);

        if (user) {
            await user.remove();
            res.json({ message: 'User removed' });
        } else {
            res.status(404);
            throw new Error('User not found');
        }
    }
);