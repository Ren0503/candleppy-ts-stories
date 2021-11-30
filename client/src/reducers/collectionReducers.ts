import {
    CollectionAddStoryAction,
    CollectionAddStoryActionTypes,
    CollectionAddStoryState,
    CollectionCreateAction,
    CollectionCreateActionTypes,
    CollectionCreateState,
    CollectionUserAction,
    CollectionUserActionTypes,
    CollectionUserState,
    CollectionRemoveStoryAction,
    CollectionRemoveStoryActionTypes,
    CollectionRemoveStoryState,
    CollectionDeleteAction,
    CollectionDeleteActionTypes,
    CollectionDeleteState,
    CollectionDetailState,
    CollectionDetailAction,
    CollectionDetailActionTypes,
} from 'types/collections';

const initialAddStoryToCollectionState: CollectionAddStoryState = {
    loading: false
};

export const collectionAddStoryReducer = (
    state: CollectionAddStoryState = initialAddStoryToCollectionState,
    action: CollectionAddStoryAction
) => {
    switch (action.type) {
        case CollectionAddStoryActionTypes.COLLECTION_ADD_STORY_REQUEST:
            return { loading: true };
        case CollectionAddStoryActionTypes.COLLECTION_ADD_STORY_SUCCESS:
            return {
                loading: initialAddStoryToCollectionState.loading,
                success: true
            };
        case CollectionAddStoryActionTypes.COLLECTION_ADD_STORY_FAILURE:
            return {
                error: action.payload
            };
        case CollectionAddStoryActionTypes.COLLECTION_ADD_STORY_RESET:
            return {};
        default:
            return state;
    }
};

const initialRemoveStoryToCollectionState: CollectionRemoveStoryState = {
    loading: false
};

export const collectionRemoveStoryReducer = (
    state: CollectionRemoveStoryState = initialRemoveStoryToCollectionState,
    action: CollectionRemoveStoryAction
) => {
    switch (action.type) {
        case CollectionRemoveStoryActionTypes.COLLECTION_REMOVE_STORY_REQUEST:
            return { loading: true };
        case CollectionRemoveStoryActionTypes.COLLECTION_REMOVE_STORY_SUCCESS:
            return {
                loading: initialRemoveStoryToCollectionState.loading,
                success: true
            };
        case CollectionRemoveStoryActionTypes.COLLECTION_REMOVE_STORY_FAILURE:
            return {
                error: action.payload
            };
        case CollectionRemoveStoryActionTypes.COLLECTION_REMOVE_STORY_RESET:
            return {};
        default:
            return state;
    }
};

const initialCollectionDeleteState: CollectionDeleteState = {
    loading: false
};

export const collectionDeleteReducer = (
    state: CollectionDeleteState = initialCollectionDeleteState,
    action: CollectionDeleteAction
) => {
    switch (action.type) {
        case CollectionDeleteActionTypes.COLLECTION_DELETE_REQUEST:
            return { loading: true };
        case CollectionDeleteActionTypes.COLLECTION_DELETE_SUCCESS:
            return {
                loading: initialCollectionDeleteState.loading,
                success: true
            };
        case CollectionDeleteActionTypes.COLLECTION_DELETE_FAILURE:
            return {
                error: action.payload
            };
        default:
            return state;
    }
};

const initialCollectionCreateState: CollectionCreateState = {
    loading: false
};

export const collectionCreateReducer = (
    state: CollectionCreateState = initialCollectionCreateState,
    action: CollectionCreateAction
) => {
    switch (action.type) {
        case CollectionCreateActionTypes.COLLECTION_CREATE_REQUEST:
            return { loading: true };
        case CollectionCreateActionTypes.COLLECTION_CREATE_SUCCESS:
            return {
                loading: initialCollectionCreateState.loading,
                success: true,
                collection: action.payload
            };
        case CollectionCreateActionTypes.COLLECTION_CREATE_FAILURE:
            return {
                error: action.payload
            };
        case CollectionCreateActionTypes.COLLECTION_CREATE_RESET:
            return {};
        default:
            return state;
    }
};

const initialCollectionUserState: CollectionUserState= {
    collections: [],
    loading: false,
};

export const collectionUserReducer = (
    state: CollectionUserState = initialCollectionUserState,
    action: CollectionUserAction
) => {
    switch (action.type) {
        case CollectionUserActionTypes.COLLECTION_USER_REQUEST:
            return {
                loading: true,
                collections: initialCollectionUserState.collections
            };
        case CollectionUserActionTypes.COLLECTION_USER_SUCCESS:
            return {
                loading: initialCollectionUserState.loading,
                collections: action.payload
            };
        case CollectionUserActionTypes.COLLECTION_USER_FAILURE:
            return {
                collections: initialCollectionUserState.collections,
                error: action.payload
            };
        default:
            return state;
    }
};

const initialCollectionDetailState: CollectionDetailState = {
    loading: false,
};

export const collectionDetailReducer = (
    state: CollectionDetailState = initialCollectionDetailState,
    action: CollectionDetailAction
) => {
    switch(action.type) {
        case CollectionDetailActionTypes.COLLECTION_DETAIL_REQUEST:
            return {
                loading: true,
            };
        case CollectionDetailActionTypes.COLLECTION_DETAIL_SUCCESS:
            return {
                loading: initialCollectionDetailState.loading,
                collection: action.payload
            };
        case CollectionDetailActionTypes.COLLECTION_DETAIL_FAILURE:
            return {
                loading: initialCollectionDetailState.loading,
                error: action.payload
            };
        default:
            return state;
    }
}