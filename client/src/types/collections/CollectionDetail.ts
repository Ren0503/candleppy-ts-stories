import { Collection } from './Collection';

export interface CollectionDetailState {
    loading: boolean;
    collection?: Collection;
    error?: undefined;
}

export enum CollectionDetailActionTypes {
    COLLECTION_DETAIL_REQUEST = 'COLLECTION_DETAIL_REQUEST',
    COLLECTION_DETAIL_SUCCESS = 'COLLECTION_DETAIL_SUCCESS',
    COLLECTION_DETAIL_FAILURE = 'COLLECTION_DETAIL_FAILURE'
}

export interface FetchCollectionRequestAction {
    type: CollectionDetailActionTypes.COLLECTION_DETAIL_REQUEST;
}

export interface FetchCollectionSuccessAction {
    type: CollectionDetailActionTypes.COLLECTION_DETAIL_SUCCESS;
    payload: Collection;
}

export interface FetchCollectionFailureAction {
    type: CollectionDetailActionTypes.COLLECTION_DETAIL_FAILURE;
    payload: any;
}

export type CollectionDetailAction =
    | FetchCollectionSuccessAction
    | FetchCollectionFailureAction
    | FetchCollectionRequestAction;
