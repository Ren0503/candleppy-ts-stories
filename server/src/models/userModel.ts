import mongoose, { Document } from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        lowercase: true,
        trim: true,
        unique: true,
        sparse: true,
    },
    avatar: {
        type: String,
        default: "https://res.cloudinary.com/dsvc4kfvh/image/upload/v1616465442/nextjs_media/enuyffce830snq6ykbqo.png",
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    }
}, {
    timestamps: true
});

export interface IUser extends Document {
    fullName: string;
    email: string;
    password: string;
    username: string;
    avatar: string;
    isAdmin: boolean;
    isValidPassword: (password: string) => Promise<boolean>;
}

userSchema.pre<IUser>('save', async function (next) {
    if (this.password) {
        const hash = await bcrypt.hash(this.password, 10);

        this.password = hash;
    }
    next();
});

userSchema.methods.isValidPassword = async function (password) {
    const user = this as IUser;
    const compare = await bcrypt.compare(password, user.password);

    return compare;
};

export default mongoose.model<IUser>('User', userSchema);