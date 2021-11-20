import { Story } from './Story';

export interface StoryDetailState {
    loading: boolean;
    story?: Story;
    error?: undefined;
}

export enum StoryDetailActionTypes {
    STORY_DETAIL_REQUEST = 'STORY_DETAIL_REQUEST',
    STORY_DETAIL_SUCCESS = 'STORY_DETAIL_SUCCESS',
    STORY_DETAIL_FAILURE = 'STORY_DETAIL_FAILURE'
}

export interface FetchStoryRequestAction {
    type: StoryDetailActionTypes.STORY_DETAIL_REQUEST;
}

export interface FetchStorySuccessAction {
    type: StoryDetailActionTypes.STORY_DETAIL_SUCCESS;
    payload: Story;
}

export interface FetchStoryFailureAction {
    type: StoryDetailActionTypes.STORY_DETAIL_FAILURE;
    payload: any;
}

export type StoryDetailAction =
    | FetchStorySuccessAction
    | FetchStoryFailureAction
    | FetchStoryRequestAction;
