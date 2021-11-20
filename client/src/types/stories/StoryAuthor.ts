import { Story } from './Story';

export interface StoryAuthorState {
	stories: Story[];
	loading?: boolean;
	error?: undefined;
}

export enum StoryAuthorActionTypes {
	STORY_AUTHOR_REQUEST = 'STORY_AUTHOR_REQUEST',
	STORY_AUTHOR_SUCCESS = 'STORY_AUTHOR_SUCCESS',
	STORY_AUTHOR_FAILURE = 'STORY_AUTHOR_FAILURE'
}

export interface StoryAuthorRequestAction {
	type: StoryAuthorActionTypes.STORY_AUTHOR_REQUEST;
}

export interface StoryAuthorSuccessAction {
	type: StoryAuthorActionTypes.STORY_AUTHOR_SUCCESS;
	payload: Story[];
}

export interface StoryAuthorFailureAction {
	type: StoryAuthorActionTypes.STORY_AUTHOR_FAILURE;
	payload: any;
}

export type StoryAuthorAction =
	| StoryAuthorRequestAction
	| StoryAuthorSuccessAction
	| StoryAuthorFailureAction;
