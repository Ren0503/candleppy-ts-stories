import mongoose from 'mongoose';
import { ArticleDocument } from '../types';

const voteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    vote: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true
});

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    body: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

const articleSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    name: {
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
    comments: [commentSchema],
    votes: [voteSchema],
    score: {
        type: Number,
        default: 0,
    },
    views: {
        type: Number,
        default: 0,
    },
    isFake: {
        type: Boolean,
        required: true,
        default: true,
    }
}, {
    timestamps: true
});

export const Article = mongoose.model<ArticleDocument>('Article', articleSchema);