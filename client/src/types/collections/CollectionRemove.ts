export interface CollectionRemoveStoryState {
	success?: boolean;
	loading?: boolean;
	error?: any;
}

export enum CollectionRemoveStoryActionTypes {
	COLLECTION_REMOVE_STORY_REQUEST = 'COLLECTION_REMOVE_STORY_REQUEST',
	COLLECTION_REMOVE_STORY_SUCCESS = 'COLLECTION_REMOVE_STORY_SUCCESS',
	COLLECTION_REMOVE_STORY_FAILURE = 'COLLECTION_REMOVE_STORY_FAILURE',
	COLLECTION_REMOVE_STORY_RESET = 'COLLECTION_REMOVE_STORY_RESET'
}

export interface CollectionRemoveStoryRequestAction {
	type: CollectionRemoveStoryActionTypes.COLLECTION_REMOVE_STORY_REQUEST;
}

export interface CollectionRemoveStorySuccessAction {
	type: CollectionRemoveStoryActionTypes.COLLECTION_REMOVE_STORY_SUCCESS;
}

export interface CollectionRemoveStoryFailureAction {
	type: CollectionRemoveStoryActionTypes.COLLECTION_REMOVE_STORY_FAILURE;
	payload: any;
}

export interface CollectionRemoveStoryResetAction {
	type: CollectionRemoveStoryActionTypes.COLLECTION_REMOVE_STORY_RESET;
}

export type CollectionRemoveStoryAction =
	| CollectionRemoveStoryRequestAction
	| CollectionRemoveStorySuccessAction
	| CollectionRemoveStoryFailureAction
	| CollectionRemoveStoryResetAction;
