import { Story } from 'types/stories';

export interface Collection {
    _id: string;
    user: {
        _id: string;
        name: string;
        avatar: string;
    }
    name: string;
    stories: Array<Story>;
    numStories: number;
}