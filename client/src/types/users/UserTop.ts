import { User } from './User';

export interface UserTopState {
	users: User[];
	loading?: boolean;
	error?: undefined;
}

export enum UserTopActionTypes {
	USER_TOP_REQUEST = 'USER_TOP_REQUEST',
	USER_TOP_SUCCESS = 'USER_TOP_SUCCESS',
	USER_TOP_FAILURE = 'USER_TOP_FAILURE'
}

export interface UserTopRequestAction {
	type: UserTopActionTypes.USER_TOP_REQUEST;
}

export interface UserTopSuccessAction {
	type: UserTopActionTypes.USER_TOP_SUCCESS;
	payload: User[];
}

export interface UserTopFailureAction {
	type: UserTopActionTypes.USER_TOP_FAILURE;
	payload: any;
}

export type UserTopAction =
	| UserTopSuccessAction
	| UserTopFailureAction
	| UserTopRequestAction;
