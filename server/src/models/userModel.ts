import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { UserDocument } from '../types';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: 'https://res.cloudinary.com/dsvc4kfvh/image/upload/v1616465442/nextjs_media/enuyffce830snq6ykbqo.png'
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
}, {
    timestamps: true,
});

userSchema.methods.matchPassword = async function (
    this: UserDocument,
    enteredPassword: string,
) {
    return await bcrypt.compare(enteredPassword, this.password)
};

userSchema.pre('save', async function (this: UserDocument, next) {
    if (!this.isModified('password')) next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

export const User = mongoose.model<UserDocument>('User', userSchema);