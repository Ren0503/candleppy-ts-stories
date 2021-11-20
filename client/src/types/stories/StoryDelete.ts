export interface StoryDeleteState {
    success?: boolean;
    loading?: boolean;
    error?: any;
}

export enum StoryDeleteActionTypes {
    STORY_DELETE_REQUEST = 'STORY_DELETE_REQUEST',
    STORY_DELETE_SUCCESS = 'STORY_DELETE_SUCCESS',
    STORY_DELETE_FAILURE = 'STORY_DELETE_FAILURE'
}

export interface StoryDeleteRequestAction {
    type: StoryDeleteActionTypes.STORY_DELETE_REQUEST;
}

export interface StoryDeleteSuccessAction {
    type: StoryDeleteActionTypes.STORY_DELETE_SUCCESS;
}

export interface StoryDeleteFailureAction {
    type: StoryDeleteActionTypes.STORY_DELETE_FAILURE;
    payload: any;
}

export type StoryDeleteAction =
    | StoryDeleteRequestAction
    | StoryDeleteSuccessAction
    | StoryDeleteFailureAction;
