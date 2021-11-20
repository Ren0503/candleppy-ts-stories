import { Story } from './Story';

export interface StoryTopState {
	stories: Story[];
	loading?: boolean;
	error?: undefined;
}

export enum StoryTopActionTypes {
	STORY_TOP_REQUEST = 'STORY_TOP_REQUEST',
	STORY_TOP_SUCCESS = 'STORY_TOP_SUCCESS',
	STORY_TOP_FAILURE = 'STORY_TOP_FAILURE'
}

export interface StoryTopRequestAction {
	type: StoryTopActionTypes.STORY_TOP_REQUEST;
}

export interface StoryTopSuccessAction {
	type: StoryTopActionTypes.STORY_TOP_SUCCESS;
	payload: Story[];
}

export interface StoryTopFailureAction {
	type: StoryTopActionTypes.STORY_TOP_FAILURE;
	payload: any;
}

export type StoryTopAction =
	| StoryTopSuccessAction
	| StoryTopFailureAction
	| StoryTopRequestAction;
