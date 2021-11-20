import mongoose, { Document } from 'mongoose';

export interface Story {
    author: string;
    title: string;
    image: string;
    description: string;
    category: string;
    body: string;
    rating: number;
    numReviews: number;
    reviews: Review[];
    views: number;
    isBestForWeek: boolean;
    isBestForMonth: boolean;
}

export interface Review {
	user: string;
	rating: number;
	comment: string;
}

export interface StoryDocument extends Story, Document {}

export interface StoryModel extends mongoose.Model<StoryDocument> {}