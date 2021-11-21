import axios from 'axios';
import { errorHandler } from 'error';

import { AppThunk } from 'store';
import {
    StoryListActionTypes,
    StoryDetailActionTypes,
    Story,
    StoryCreateActionTypes,
    StoryDeleteActionTypes,
    StoryUpdateActionTypes,
    StoryTopActionTypes,
    StoryAuthorActionTypes,
    StoryCreateReviewActionTypes,
} from 'types/stories';

interface UpdateStoryInput {
    _id: string;
    title: string;
    description: string;
    image: string;
    category: string;
    body: string;
}

export const listStories = (
    keyword: string = '',
    category: string = '',
    pageNumber: string = ''
): AppThunk => async (dispatch) => {
    try {
        dispatch({
            type: StoryListActionTypes.STORY_LIST_REQUEST
        });

        const { data } = await axios.get<{
            stories: Story[];
            page: number;
            pages: number;
        }>(`/api/stories?keyword=${keyword}&category=${category}&pageNumber=${pageNumber}`);

        dispatch({
            type: StoryListActionTypes.STORY_LIST_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: StoryListActionTypes.STORY_LIST_FAILURE,
            payload: errorHandler(error)
        });
    }
};

export const detailStory = (id: string): AppThunk => async (
    dispatch
) => {
    try {
        dispatch({
            type: StoryDetailActionTypes.STORY_DETAIL_REQUEST
        });

        const { data } = await axios.get<Story>(`/api/stories/${id}`);

        dispatch({
            type: StoryDetailActionTypes.STORY_DETAIL_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: StoryDetailActionTypes.STORY_DETAIL_FAILURE,
            payload: errorHandler(error)
        });
    }
};

export const createStory = (): AppThunk => async (dispatch, getState) => {
    try {
        dispatch({ type: StoryCreateActionTypes.STORY_CREATE_REQUEST });

        const { userInfo } = getState().userLogin;
        
        const config = {
            headers: {
                'Content-Type': 'Application/json',
                Authorization: `Bearer ${userInfo?.token}`
            }
        };

        const { data } = await axios.post<Story>(`/api/stories`, {}, config);

        dispatch({
            type: StoryCreateActionTypes.STORY_CREATE_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: StoryCreateActionTypes.STORY_CREATE_FAILURE,
            payload: errorHandler(error)
        });
    }
};

export const updateStory = (story: UpdateStoryInput): AppThunk => async (
    dispatch,
    getState
) => {
    try {
        dispatch({ type: StoryUpdateActionTypes.STORY_UPDATE_REQUEST });
        
        const { userInfo } = getState().userLogin;
        
        const config = {
            headers: {
                'Content-Type': 'Application/json',
                Authorization: `Bearer ${userInfo?.token}`
            }
        };

        const { data } = await axios.put<Story>(
            `/api/stories/${story._id}`,
            story,
            config
        );

        dispatch({
            type: StoryUpdateActionTypes.STORY_UPDATE_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: StoryUpdateActionTypes.STORY_UPDATE_FAILURE,
            payload: errorHandler(error)
        });
    }
};

export const deleteStory = (id: string): AppThunk => async (
    dispatch,
    getState
) => {
    try {
        dispatch({
            type: StoryDeleteActionTypes.STORY_DELETE_REQUEST
        });

        const { userInfo } = getState().userLogin;

        const config = {
            headers: {
                'Content-Type': 'Application/json',
                Authorization: `Bearer ${userInfo?.token}`
            }
        };
        
        await axios.delete(`/api/stories/${id}/`, config);

        dispatch({
            type: StoryDeleteActionTypes.STORY_DELETE_SUCCESS
        });
    } catch (error) {
        dispatch({
            type: StoryDeleteActionTypes.STORY_DELETE_FAILURE,
            payload: errorHandler(error)
        });
    }
};

export const listTopStories = (): AppThunk => async (dispatch) => {
    try {
        dispatch({ type: StoryTopActionTypes.STORY_TOP_REQUEST });

        const { data } = await axios.get<Story[]>(`/api/stories/top`);

        dispatch({
            type: StoryTopActionTypes.STORY_TOP_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: StoryTopActionTypes.STORY_TOP_FAILURE,
            payload: errorHandler(error)
        });
    }
};

export const createStoryReview = (
    storyId: string,
    review: { rating: number; comment: string }
): AppThunk => async (dispatch, getState) => {
    try {
        dispatch({
            type: StoryCreateReviewActionTypes.STORY_CREATE_REVIEW_REQUEST
        });

        const { userInfo } = getState().userLogin;
		const config = {
			headers: {
				'Content-Type': 'Application/json',
				Authorization: `Bearer ${userInfo?.token}`
			}
		};

        await axios.post(`/api/stories/${storyId}/reviews`, review, config);

        dispatch({
            type: StoryCreateReviewActionTypes.STORY_CREATE_REVIEW_SUCCESS
        });
    } catch (error) {
        dispatch({
            type: StoryCreateReviewActionTypes.STORY_CREATE_REVIEW_FAILURE,
            payload: errorHandler(error)
        });
    }
};

export const listAuthorStories = (userId: string,): AppThunk => async (
    dispatch
) => {
    try {
        dispatch({
            type: StoryAuthorActionTypes.STORY_AUTHOR_REQUEST
        });

        const { data } = await axios.get<Story[]>(`/api/stories/user/${userId}`);

        dispatch({
            type: StoryAuthorActionTypes.STORY_AUTHOR_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: StoryAuthorActionTypes.STORY_AUTHOR_FAILURE,
            payload: errorHandler(error)
        });
    }
};