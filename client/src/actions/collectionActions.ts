import axios from 'axios';
import { errorHandler } from 'error';

import { AppThunk } from 'store';
import {
    CollectionAddStoryActionTypes,
    CollectionRemoveStoryActionTypes,
    Collection,
    CollectionCreateActionTypes,
    CollectionDeleteActionTypes,
    CollectionUserActionTypes,
    CollectionDetailActionTypes,
} from 'types/collections';

export const createCollection = (name: string): AppThunk => async (dispatch, getState) => {
    try {
        dispatch({ type: CollectionCreateActionTypes.COLLECTION_CREATE_REQUEST });

        const { userInfo } = getState().userLogin;

        const config = {
            headers: {
                'Content-Type': 'Application/json',
                Authorization: `Bearer ${userInfo?.token}`
            }
        };

        const { data } = await axios.post<Collection>(`/api/collections`, { name }, config);

        dispatch({
            type: CollectionCreateActionTypes.COLLECTION_CREATE_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: CollectionCreateActionTypes.COLLECTION_CREATE_FAILURE,
            payload: errorHandler(error)
        });
    }
};

export const deleteCollection = (id: string): AppThunk => async (dispatch, getState) => {
    try {
        dispatch({
            type: CollectionDeleteActionTypes.COLLECTION_DELETE_REQUEST
        });

        const { userInfo } = getState().userLogin;

        const config = {
            headers: {
                'Content-Type': 'Application/json',
                Authorization: `Bearer ${userInfo?.token}`
            }
        };

        await axios.delete(`/api/collections/${id}/`, config);

        dispatch({
            type: CollectionDeleteActionTypes.COLLECTION_DELETE_SUCCESS
        });
    } catch (error) {
        dispatch({
            type: CollectionDeleteActionTypes.COLLECTION_DELETE_FAILURE,
            payload: errorHandler(error)
        });
    }
};

export const listCollectionsUser = (): AppThunk => async (dispatch, getState) => {
    try {
        dispatch({
            type: CollectionUserActionTypes.COLLECTION_USER_REQUEST
        });

        const { userInfo } = getState().userLogin;
        const config = {
            headers: {
                'Content-Type': 'Application/json',
                Authorization: `Bearer ${userInfo?.token}`
            }
        };

        const { data } = await axios.get<Collection[]>(`/api/collections/my_collections`, config);

        dispatch({
            type: CollectionUserActionTypes.COLLECTION_USER_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: CollectionUserActionTypes.COLLECTION_USER_FAILURE,
            payload: errorHandler(error)
        });
    }
};

export const addStoryToCollection = (
    collectionId: string,
    story: { _id: string }
): AppThunk => async (dispatch, getState) => {
    try {
        dispatch({
            type: CollectionAddStoryActionTypes.COLLECTION_ADD_STORY_REQUEST
        });

        const { userInfo } = getState().userLogin;
        const config = {
            headers: {
                'Content-Type': 'Application/json',
                Authorization: `Bearer ${userInfo?.token}`
            }
        };

        await axios.post(`/api/collections/${collectionId}/add`, { story }, config);

        dispatch({
            type: CollectionAddStoryActionTypes.COLLECTION_ADD_STORY_SUCCESS
        });
    } catch (error) {
        dispatch({
            type: CollectionAddStoryActionTypes.COLLECTION_ADD_STORY_FAILURE,
            payload: errorHandler(error)
        });
    }
};

export const removeStoryFromCollection = (
    collectionId: string,
    storyId: string,
): AppThunk => async (dispatch, getState) => {
    try {
        dispatch({
            type: CollectionRemoveStoryActionTypes.COLLECTION_REMOVE_STORY_REQUEST
        });

        const { userInfo } = getState().userLogin;
        const config = {
            headers: {
                'Content-Type': 'Application/json',
                Authorization: `Bearer ${userInfo?.token}`
            }
        };

        await axios.delete(`/api/collections/${collectionId}/remove/${storyId}`, config);

        dispatch({
            type: CollectionRemoveStoryActionTypes.COLLECTION_REMOVE_STORY_SUCCESS
        });
    } catch (error) {
        dispatch({
            type: CollectionRemoveStoryActionTypes.COLLECTION_REMOVE_STORY_FAILURE,
            payload: errorHandler(error)
        });
    }
};

export const detailCollection = (id: string): AppThunk => async (dispatch, getState) => {
    try {
        dispatch({
            type: CollectionDetailActionTypes.COLLECTION_DETAIL_REQUEST,
        });

        const { userInfo } = getState().userLogin;
        const config = {
            headers: {
                'Content-Type': 'Application/json',
                Authorization: `Bearer ${userInfo?.token}`
            }
        };

        const { data } = await axios.get<Collection>(`/api/collections/${id}`, config);

        dispatch({
            type: CollectionDetailActionTypes.COLLECTION_DETAIL_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: CollectionDetailActionTypes.COLLECTION_DETAIL_FAILURE,
            payload: errorHandler(error)
        })
    }
}