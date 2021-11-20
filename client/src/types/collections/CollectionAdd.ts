export interface CollectionAddStoryState {
	success?: boolean;
	loading?: boolean;
	error?: any;
}

export enum CollectionAddStoryActionTypes {
	COLLECTION_ADD_STORY_REQUEST = 'COLLECTION_ADD_STORY_REQUEST',
	COLLECTION_ADD_STORY_SUCCESS = 'COLLECTION_ADD_STORY_SUCCESS',
	COLLECTION_ADD_STORY_FAILURE = 'COLLECTION_ADD_STORY_FAILURE',
	COLLECTION_ADD_STORY_RESET = 'COLLECTION_ADD_STORY_RESET'
}

export interface CollectionAddStoryRequestAction {
	type: CollectionAddStoryActionTypes.COLLECTION_ADD_STORY_REQUEST;
}

export interface CollectionAddStorySuccessAction {
	type: CollectionAddStoryActionTypes.COLLECTION_ADD_STORY_SUCCESS;
}

export interface CollectionAddStoryFailureAction {
	type: CollectionAddStoryActionTypes.COLLECTION_ADD_STORY_FAILURE;
	payload: any;
}

export interface CollectionAddStoryResetAction {
	type: CollectionAddStoryActionTypes.COLLECTION_ADD_STORY_RESET;
}

export type CollectionAddStoryAction =
	| CollectionAddStoryRequestAction
	| CollectionAddStorySuccessAction
	| CollectionAddStoryFailureAction
	| CollectionAddStoryResetAction;
