import { Story } from './Story';

export interface StoryUpdateState {
    success?: boolean;
    story?: Story;
    loading?: boolean;
    error?: any;
}

export enum StoryUpdateActionTypes {
    STORY_UPDATE_REQUEST = 'STORY_UPDATE_REQUEST',
    STORY_UPDATE_SUCCESS = 'STORY_UPDATE_SUCCESS',
    STORY_UPDATE_FAILURE = 'STORY_UPDATE_FAILURE',
    STORY_UPDATE_RESET = 'STORY_UPDATE_RESET'
}

export interface StoryUpdateRequestAction {
    type: StoryUpdateActionTypes.STORY_UPDATE_REQUEST;
}

export interface StoryUpdateSuccessAction {
    type: StoryUpdateActionTypes.STORY_UPDATE_SUCCESS;
    payload: Story;
}

export interface StoryUpdateFailureAction {
    type: StoryUpdateActionTypes.STORY_UPDATE_FAILURE;
    payload: any;
}

export interface StoryUpdateResetAction {
    type: StoryUpdateActionTypes.STORY_UPDATE_RESET;
}

export type StoryUpdateAction =
    | StoryUpdateRequestAction
    | StoryUpdateSuccessAction
    | StoryUpdateFailureAction
    | StoryUpdateResetAction;
