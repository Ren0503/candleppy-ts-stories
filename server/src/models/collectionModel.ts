import mongoose from 'mongoose';
import { CollectionDocument } from '../types';

const collectionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: true,
    },
    stories: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Story'
    }],
    numStories: {
        type: Number,
        required: true,
        default: 0,
    }
}, {
    timestamps: true,
});

export const Collection = mongoose.model<CollectionDocument>('Collection', collectionSchema);