import mongoose from 'mongoose';
import { StoryDocument } from '../types';

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const storySchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    reviews: [reviewSchema],
    rating: {
        type: Number,
        default: 0,
    },
    views: {
        type: Number,
        default: 0,
    },
    isBestForWeek: {
        type: Boolean,
        default: false,
    },
    isBestForMonth: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true
});

export const Story = mongoose.model<StoryDocument>('Story', storySchema);