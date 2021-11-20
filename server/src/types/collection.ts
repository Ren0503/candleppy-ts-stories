import mongoose, { Document } from 'mongoose';
import { StoryDocument } from './story';

export interface Collection {
    user: string;
    stories: StoryDocument[];
    name: string;
    numStories: number;
}

export interface CollectionDocument extends Collection, Document {}

export interface CollectionModel extends mongoose.Model<CollectionDocument> {}