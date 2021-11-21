import { Story } from 'types/stories';

export interface Collection {
    user: {
        _id: string;
        name: string;
        avatar: string;
    }
    name: string;
    stories: Story[];
    numStories: number;
}