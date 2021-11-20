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
    ProductListState,
    ProductDetailState,
    ProductCreateState,
    ProductUpdateState,
    ProductDeleteState,
    ProductTopState,
} from './products';

import {
    OrderDetailState,
    OrderListState,
    OrderPayState,
    OrderDeliverState,
} from './orders';

export interface ReduxState {
    userLogin: UserLoginState;
	userRegister: UserRegisterState;
	userDetail: UserDetailState;
	userUpdateProfile: UserUpdateProfileState;
    productList: ProductListState;
	productDetail: ProductDetailState;
	orderList: OrderListState;
    orderDetail: OrderDetailState;
	orderPay: OrderPayState;
	userList: UserListState;
	userDelete: UserDeleteState;
	userUpdate: UserUpdateState;
	productDelete: ProductDeleteState;
	productCreate: ProductCreateState;
	ProductUpdate: ProductUpdateState;
    orderDeliver: OrderDeliverState;
	productTopRated: ProductTopState;
}