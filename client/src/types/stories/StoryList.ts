import { Story } from './Story';

export interface StoryListState {
    stories: Story[];
    pages?: number;
    page?: number;
    loading: boolean;
    error?: undefined;
}

export enum StoryListActionTypes {
    STORY_LIST_REQUEST = 'STORY_LIST_REQUEST',
    STORY_LIST_SUCCESS = 'STORY_LIST_SUCCESS',
    STORY_LIST_FAILURE = 'STORY_LIST_FAILURE'
}

export interface FetchStoriesRequestAction {
    type: StoryListActionTypes.STORY_LIST_REQUEST;
}

export interface FetchStoriesSuccessAction {
    type: StoryListActionTypes.STORY_LIST_SUCCESS;
    payload: { products: Story[]; pages: number; page: number };
}

export interface FetchStoriesFailureAction {
    type: StoryListActionTypes.STORY_LIST_FAILURE;
    payload: any;
}

export type StoryListAction =
    | FetchStoriesSuccessAction
    | FetchStoriesFailureAction
    | FetchStoriesRequestAction;
