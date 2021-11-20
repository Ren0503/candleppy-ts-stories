export interface StoryCreateReviewState {
	success?: boolean;
	loading?: boolean;
	error?: any;
}

export enum StoryCreateReviewActionTypes {
	STORY_CREATE_REVIEW_REQUEST = 'STORY_CREATE_REVIEW_REQUEST',
	STORY_CREATE_REVIEW_SUCCESS = 'STORY_CREATE_REVIEW_SUCCESS',
	STORY_CREATE_REVIEW_FAILURE = 'STORY_CREATE_REVIEW_FAILURE',
	STORY_CREATE_REVIEW_RESET = 'STORY_CREATE_REVIEW_RESET'
}

export interface StoryCreateReviewRequestAction {
	type: StoryCreateReviewActionTypes.STORY_CREATE_REVIEW_REQUEST;
}

export interface StoryCreateReviewSuccessAction {
	type: StoryCreateReviewActionTypes.STORY_CREATE_REVIEW_SUCCESS;
}

export interface StoryCreateReviewFailureAction {
	type: StoryCreateReviewActionTypes.STORY_CREATE_REVIEW_FAILURE;
	payload: any;
}

export interface StoryCreateReviewResetAction {
	type: StoryCreateReviewActionTypes.STORY_CREATE_REVIEW_RESET;
}

export type StoryCreateReviewAction =
	| StoryCreateReviewRequestAction
	| StoryCreateReviewSuccessAction
	| StoryCreateReviewFailureAction
	| StoryCreateReviewResetAction;
