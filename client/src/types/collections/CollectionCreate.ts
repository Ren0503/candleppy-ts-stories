import { Collection } from './Collection';

export interface CollectionCreateState {
    success?: boolean;
    collection?: Collection;
    loading?: boolean;
    error?: any;
}

export enum CollectionCreateActionTypes {
    COLLECTION_CREATE_REQUEST = 'COLLECTION_CREATE_REQUEST',
    COLLECTION_CREATE_SUCCESS = 'COLLECTION_CREATE_SUCCESS',
    COLLECTION_CREATE_FAILURE = 'COLLECTION_CREATE_FAILURE',
    COLLECTION_CREATE_RESET = 'COLLECTION_CREATE_RESET'
}


export interface CollectionCreateRequestAction {
    type: CollectionCreateActionTypes.COLLECTION_CREATE_REQUEST;
}

export interface CollectionCreateSuccessAction {
    type: CollectionCreateActionTypes.COLLECTION_CREATE_SUCCESS;
    payload: Collection;
}

export interface CollectionCreateFailureAction {
    type: CollectionCreateActionTypes.COLLECTION_CREATE_FAILURE;
    payload: any;
}

export interface CollectionCreateResetAction {
    type: CollectionCreateActionTypes.COLLECTION_CREATE_RESET;
}

export type CollectionCreateAction =
    | CollectionCreateRequestAction
    | CollectionCreateSuccessAction
    | CollectionCreateFailureAction
    | CollectionCreateResetAction;