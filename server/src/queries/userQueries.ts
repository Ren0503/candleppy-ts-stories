// @ts-nocheck
import { User } from '../models';

export const getAuthUser = async (email: string): Promise<any> => {
    const user = await User.findOne({ email }).select('-password')

    return user;
}

export const createUser = async (
    fullName: string,
    username: string,
    email: string,
    password: string
): Promise<any> => {
    const user = await User.create({
        fullName,
        username,
        email,
        password
    });

    return user;
};

export const getUsers = async (): Promise<any> => {
    const users = await User.find();

    return users;
};

export const getUserById = async (id: string): Promise<any> => {
    const user = await User.findById(id).select('-password')

    return user;
};

export const updateUser = async (id: string, fieldsToUpdate: any): Promise<any> => {
    const user = await User.findOneAndUpdate({ _id: id }, { ...fieldsToUpdate }, { new: true });

    return user;
  };

export const deleteUser = async (id: string): Promise<any> => {
    const user = await User.findByIdAndRemove(id);
    return user;
};