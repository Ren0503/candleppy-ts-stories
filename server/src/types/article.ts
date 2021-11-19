import mongoose, { Document } from 'mongoose';

export interface Vote {
    user: string;
    vote: number;
}

export interface Comment {
    user: string;
    body: string;
}

export interface Article {
    user: string;
    name: string;
    description: string;
    category: string;
    image: string;
    body: string;
    score: number;
    views: number;
    isFake: boolean;
}

interface ArticleForDB extends Article {
    votes: Vote[];
    comments: Comment[];
}

export interface ArticleDocument extends ArticleForDB, Document {}

export interface ArticleModel extends mongoose.Model<ArticleDocument> {}