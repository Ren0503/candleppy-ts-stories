import {
    StoryListAction,
    StoryListActionTypes,
    StoryListState,
    StoryDetailAction,
    StoryDetailActionTypes,
    StoryDetailState,
    StoryDeleteAction,
    StoryDeleteActionTypes,
    StoryDeleteState,
    StoryCreateAction,
    StoryCreateActionTypes,
    StoryCreateState,
    StoryUpdateAction,
    StoryUpdateActionTypes,
    StoryUpdateState,
    StoryTopAction,
    StoryTopActionTypes,
    StoryTopState,
    StoryCreateReviewAction,
    StoryCreateReviewActionTypes,
    StoryCreateReviewState,
    StoryAuthorAction,
    StoryAuthorActionTypes,
    StoryAuthorState,
} from 'types/stories';

const initialStoryListState: StoryListState = {
    stories: [],
    loading: false
};

export const storyListReducer = (
    state: StoryListState = initialStoryListState,
    action: StoryListAction
) => {
    switch (action.type) {
        case StoryListActionTypes.STORY_LIST_REQUEST:
            return {
                loading: true,
                stories: initialStoryListState.stories
            };
        case StoryListActionTypes.STORY_LIST_SUCCESS:
            return {
                loading: initialStoryListState.loading,
                stories: action.payload.stories,
                count: action.payload.count,
            };
        case StoryListActionTypes.STORY_LIST_FAILURE:
            return {
                loading: initialStoryListState.loading,
                stories: initialStoryListState.stories,
                error: action.payload
            };
        default:
            return state;
    }
};

const initialStoryDetailState: StoryDetailState = {
    loading: false
};

export const storyDetailReducer = (
    state: StoryDetailState = initialStoryDetailState,
    action: StoryDetailAction
) => {
    switch (action.type) {
        case StoryDetailActionTypes.STORY_DETAIL_REQUEST:
            return {
                loading: true,
                story: initialStoryDetailState.story
            };
        case StoryDetailActionTypes.STORY_DETAIL_SUCCESS:
            return {
                loading: initialStoryDetailState.loading,
                story: action.payload
            };
        case StoryDetailActionTypes.STORY_DETAIL_FAILURE:
            return {
                loading: initialStoryDetailState.loading,
                story: initialStoryDetailState.story,
                error: action.payload
            };
        default:
            return state;
    }
};

const initialStoryDeleteState: StoryDeleteState = {
    loading: false
};

export const storyDeleteReducer = (
    state: StoryDeleteState = initialStoryDeleteState,
    action: StoryDeleteAction
) => {
    switch (action.type) {
        case StoryDeleteActionTypes.STORY_DELETE_REQUEST:
            return { loading: true };
        case StoryDeleteActionTypes.STORY_DELETE_SUCCESS:
            return {
                loading: initialStoryDeleteState.loading,
                success: true
            };
        case StoryDeleteActionTypes.STORY_DELETE_FAILURE:
            return {
                error: action.payload
            };
        default:
            return state;
    }
};

const initialStoryCreateState: StoryCreateState = {
    loading: false
};

export const storyCreateReducer = (
    state: StoryCreateState = initialStoryCreateState,
    action: StoryCreateAction
) => {
    switch (action.type) {
        case StoryCreateActionTypes.STORY_CREATE_REQUEST:
            return { loading: true };
        case StoryCreateActionTypes.STORY_CREATE_SUCCESS:
            return {
                loading: initialStoryCreateState.loading,
                success: true,
                story: action.payload
            };
        case StoryCreateActionTypes.STORY_CREATE_FAILURE:
            return {
                error: action.payload
            };
        case StoryCreateActionTypes.STORY_CREATE_RESET:
            return {};
        default:
            return state;
    }
};

const initialStoryUpdateState: StoryUpdateState = {
    loading: false
};

export const storyUpdateReducer = (
    state: StoryUpdateState = initialStoryUpdateState,
    action: StoryUpdateAction
) => {
    switch (action.type) {
        case StoryUpdateActionTypes.STORY_UPDATE_REQUEST:
            return { loading: true };
        case StoryUpdateActionTypes.STORY_UPDATE_SUCCESS:
            return {
                loading: initialStoryUpdateState.loading,
                success: true,
                story: action.payload
            };
        case StoryUpdateActionTypes.STORY_UPDATE_FAILURE:
            return {
                error: action.payload
            };
        case StoryUpdateActionTypes.STORY_UPDATE_RESET:
            return {};
        default:
            return state;
    }
};

const initialStoryTopState: StoryTopState = {
    stories: [],
    loading: false
};

export const storyTopRatedReducer = (
    state: StoryTopState = initialStoryTopState,
    action: StoryTopAction
) => {
    switch (action.type) {
        case StoryTopActionTypes.STORY_TOP_REQUEST:
            return {
                loading: true,
                stories: initialStoryTopState.stories
            };
        case StoryTopActionTypes.STORY_TOP_SUCCESS:
            return {
                loading: initialStoryTopState.loading,
                stories: action.payload
            };
        case StoryTopActionTypes.STORY_TOP_FAILURE:
            return {
                stories: initialStoryListState.stories,
                error: action.payload
            };
        default:
            return state;
    }
};

const initialStoryCreateReviewState: StoryCreateReviewState = {
    loading: false
};

export const storyCreateReviewReducer = (
    state: StoryCreateReviewState = initialStoryCreateReviewState,
    action: StoryCreateReviewAction
) => {
    switch (action.type) {
        case StoryCreateReviewActionTypes.STORY_CREATE_REVIEW_REQUEST:
            return { loading: true };
        case StoryCreateReviewActionTypes.STORY_CREATE_REVIEW_SUCCESS:
            return {
                loading: initialStoryCreateReviewState.loading,
                success: true
            };
        case StoryCreateReviewActionTypes.STORY_CREATE_REVIEW_FAILURE:
            return {
                error: action.payload
            };
        case StoryCreateReviewActionTypes.STORY_CREATE_REVIEW_RESET:
            return {};
        default:
            return state;
    }
};

const initialStoryAuthorState: StoryAuthorState= {
    stories: [],
    loading: false,
};

export const storyAuthorReducer = (
    state: StoryAuthorState = initialStoryAuthorState,
    action: StoryAuthorAction
) => {
    switch (action.type) {
        case StoryAuthorActionTypes.STORY_AUTHOR_REQUEST:
            return {
                loading: true,
                stories: initialStoryAuthorState.stories
            };
        case StoryAuthorActionTypes.STORY_AUTHOR_SUCCESS:
            return {
                loading: initialStoryAuthorState.loading,
                stories: action.payload
            };
        case StoryAuthorActionTypes.STORY_AUTHOR_FAILURE:
            return {
                stories: initialStoryAuthorState.stories,
                error: action.payload
            };
        default:
            return state;
    }
};