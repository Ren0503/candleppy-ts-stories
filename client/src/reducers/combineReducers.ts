import { combineReducers } from 'redux';
import {
	userLoginReducer,
	userRegisterReducer,
	userDetailReducer,
	userUpdateProfileReducer,
	userListReducer,
	userDeleteReducer,
	userUpdateReducer,
} from './userReducers';

import {
	storyListReducer,
	storyDetailReducer,
	storyDeleteReducer,
	storyCreateReducer,
	storyUpdateReducer,
	storyTopRatedReducer,
	storyCreateReviewReducer,
	storyAuthorReducer,
} from './storyReducers';

import {
	collectionAddStoryReducer,
	collectionRemoveStoryReducer,
	collectionCreateReducer,
	collectionDeleteReducer,
	collectionUserReducer,
	collectionDetailReducer,
} from './collectionReducers';

import { ReduxState } from 'types/ReduxState';

const reducer = combineReducers<ReduxState>({
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	userDetail: userDetailReducer,
	userUpdateProfile: userUpdateProfileReducer,
	userList: userListReducer,
	userDelete: userDeleteReducer,
	userUpdate: userUpdateReducer,
	storyList: storyListReducer,
	storyDetail: storyDetailReducer,
	storyDelete: storyDeleteReducer,
	storyCreate: storyCreateReducer,
	storyUpdate: storyUpdateReducer,
	storyTopRated: storyTopRatedReducer,
	storyCreateReview: storyCreateReviewReducer,
	storyAuthor: storyAuthorReducer,
	collectionAddStory: collectionAddStoryReducer,
	collectionRemoveStory: collectionRemoveStoryReducer,
	collectionUser: collectionUserReducer,
	collectionCreate: collectionCreateReducer,
	collectionDelete: collectionDeleteReducer,
	collectionDetail: collectionDetailReducer,
});

export default reducer;