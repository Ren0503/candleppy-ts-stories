export interface CollectionDeleteState {
    success?: boolean;
    loading?: boolean;
    error?: any;
}

export enum CollectionDeleteActionTypes {
    COLLECTION_DELETE_REQUEST = 'COLLECTION_DELETE_REQUEST',
    COLLECTION_DELETE_SUCCESS = 'COLLECTION_DELETE_SUCCESS',
    COLLECTION_DELETE_FAILURE = 'COLLECTION_DELETE_FAILURE'
}

export interface CollectionDeleteRequestAction {
    type: CollectionDeleteActionTypes.COLLECTION_DELETE_REQUEST;
}

export interface CollectionDeleteSuccessAction {
    type: CollectionDeleteActionTypes.COLLECTION_DELETE_SUCCESS;
}

export interface CollectionDeleteFailureAction {
    type: CollectionDeleteActionTypes.COLLECTION_DELETE_FAILURE;
    payload: any;
}

export type CollectionDeleteAction =
    | CollectionDeleteRequestAction
    | CollectionDeleteSuccessAction
    | CollectionDeleteFailureAction;
