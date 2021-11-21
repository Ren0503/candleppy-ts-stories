import { Collection } from './Collection';

export interface CollectionUserState {
	collections: Collection[];
	loading?: boolean;
	error?: undefined;
}

export enum CollectionUserActionTypes {
	COLLECTION_USER_REQUEST = 'COLLECTION_USER_REQUEST',
	COLLECTION_USER_SUCCESS = 'COLLECTION_USER_SUCCESS',
	COLLECTION_USER_FAILURE = 'COLLECTION_USER_FAILURE'
}

export interface CollectionUserRequestAction {
	type: CollectionUserActionTypes.COLLECTION_USER_REQUEST;
}

export interface CollectionUserSuccessAction {
	type: CollectionUserActionTypes.COLLECTION_USER_SUCCESS;
	payload: Collection[];
}

export interface CollectionUserFailureAction {
	type: CollectionUserActionTypes.COLLECTION_USER_FAILURE;
	payload: any;
}

export type CollectionUserAction =
	| CollectionUserRequestAction
	| CollectionUserSuccessAction
	| CollectionUserFailureAction;
