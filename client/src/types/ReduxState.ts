import {
    UserLoginState,
	UserRegisterState,
	UserDetailState,
	UserListState,
	UserUpdateProfileState,
    UserUpdateState,
	UserDeleteState,
} from './users';

import {
    StoryListState,
    StoryDetailState,
    StoryCreateState,
    StoryUpdateState,
    StoryDeleteState,
    StoryTopState,
	StoryCreateReviewState,
	StoryAuthorState,
} from './stories';

import {
    CollectionAddStoryState,
    CollectionRemoveStoryState,
    CollectionUserState,
    CollectionCreateState,
	CollectionDeleteState,
} from './collections';

export interface ReduxState {
    userLogin: UserLoginState;
	userRegister: UserRegisterState;
	userDetail: UserDetailState;
	userUpdateProfile: UserUpdateProfileState;
	userList: UserListState;
	userDelete: UserDeleteState;
	userUpdate: UserUpdateState;
    storyList: StoryListState;
	storyDetail: StoryDetailState;
	storyDelete: StoryDeleteState;
	storyCreate: StoryCreateState;
	storyUpdate: StoryUpdateState;
	storyTopRated: StoryTopState;
	storyCreateReview: StoryCreateReviewState;
	storyAuthor: StoryAuthorState;
	collectionAddStory: CollectionAddStoryState;
	collectionRemoveStory: CollectionRemoveStoryState;
	collectionUser: CollectionUserState;
	collectionCreate: CollectionCreateState;
	collectionDelete: CollectionDeleteState;
}