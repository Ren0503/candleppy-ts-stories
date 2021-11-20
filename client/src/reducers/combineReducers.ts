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
	productListReducer,
	productDetailReducer,
    productDeleteReducer,
	productCreateReducer,
	productUpdateReducer,
    productTopRatedReducer
} from './productReducers';

import {
    orderDetailReducer,
	orderPayReducer,
    orderListReducer,
	orderDeliverReducer,
} from './orderReducers';

import { ReduxState } from 'types/ReduxState';

const reducer = combineReducers<ReduxState>({
	productList: productListReducer,
	productDetail: productDetailReducer,
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	userDetail: userDetailReducer,
	userUpdateProfile: userUpdateProfileReducer,
	orderDetail: orderDetailReducer,
	orderPay: orderPayReducer,
	userList: userListReducer,
	userDelete: userDeleteReducer,
	userUpdate: userUpdateReducer,
	productDelete: productDeleteReducer,
	productCreate: productCreateReducer,
	ProductUpdate: productUpdateReducer,
	orderList: orderListReducer,
	orderDeliver: orderDeliverReducer,
	productTopRated: productTopRatedReducer
});

export default reducer;