import { Story } from './Story';

export interface StoryCreateState {
    success?: boolean;
    story?: Story;
    loading?: boolean;
    error?: any;
}

export enum StoryCreateActionTypes {
    STORY_CREATE_REQUEST = 'STORY_CREATE_REQUEST',
    STORY_CREATE_SUCCESS = 'STORY_CREATE_SUCCESS',
    STORY_CREATE_FAILURE = 'STORY_CREATE_FAILURE',
    STORY_CREATE_RESET = 'STORY_CREATE_RESET'
}

export interface StoryCreateRequestAction {
    type: StoryCreateActionTypes.STORY_CREATE_REQUEST;
}

export interface StoryCreateSuccessAction {
    type: StoryCreateActionTypes.STORY_CREATE_SUCCESS;
    payload: Story;
}

export interface StoryCreateFailureAction {
    type: StoryCreateActionTypes.STORY_CREATE_FAILURE;
    payload: any;
}

export interface StoryCreateResetAction {
    type: StoryCreateActionTypes.STORY_CREATE_RESET;
}

export type StoryCreateAction =
    | StoryCreateRequestAction
    | StoryCreateSuccessAction
    | StoryCreateFailureAction
    | StoryCreateResetAction;
