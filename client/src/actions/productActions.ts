import axios from 'axios';
import { errorHandler } from 'error';

import { AppThunk } from 'store';

import {
    ProductListActionTypes,
    ProductDetailActionTypes,
    Product,
    ProductDeleteActionTypes,
    ProductCreateActionTypes,
    ProductUpdateActionTypes,
    ProductTopActionTypes
} from 'types/products';

interface UpdateProductInput {
    _id: string;
    name: string;
    image: string;
    description: string;
    brand: string;
    category: string;
    price: number;
    countInStock: number;
}

export const listProducts = (
    keyword: string = '',
): AppThunk => async (dispatch) => {
    try {
        dispatch({ type: ProductListActionTypes.PRODUCT_LIST_REQUEST });

        const { data } = await axios.get<{
            products: Product[];
            page: number;
            pages: number;
        }>(`/api/products${keyword}`);

        dispatch({
            type: ProductListActionTypes.PRODUCT_LIST_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: ProductListActionTypes.PRODUCT_LIST_FAILURE,
            payload: errorHandler(error)
        });
    }
};

export const detailProduct = (id: string): AppThunk => async (
    dispatch
) => {
    try {
        dispatch({ type: ProductDetailActionTypes.PRODUCT_DETAIL_REQUEST });

        const { data } = await axios.get<Product>(`/api/products/${id}`);

        dispatch({
            type: ProductDetailActionTypes.PRODUCT_DETAIL_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: ProductDetailActionTypes.PRODUCT_DETAIL_FAILURE,
            payload: errorHandler(error)
        });
    }
};

export const deleteProduct = (id: string): AppThunk => async (
    dispatch,
    getState
) => {
    try {
        dispatch({ type: ProductDeleteActionTypes.PRODUCT_DELETE_REQUEST });
        
        const { userInfo } = getState().userLogin;
        
        const config = {
            headers: {
                'Content-Type': 'Application/json',
                Authorization: `Bearer ${userInfo?.token}`
            }
        };
        
        await axios.delete(`/api/products/delete/${id}/`, config);
        
        dispatch({
            type: ProductDeleteActionTypes.PRODUCT_DELETE_SUCCESS
        });

    } catch (error) {
        dispatch({
            type: ProductDeleteActionTypes.PRODUCT_DELETE_FAILURE,
            payload: errorHandler(error)
        });
    }
};

export const createProduct = (): AppThunk => async (dispatch, getState) => {
    try {
        dispatch({ type: ProductCreateActionTypes.PRODUCT_CREATE_REQUEST });
        
        const { userInfo } = getState().userLogin;
        
        const config = {
            headers: {
                'Content-Type': 'Application/json',
                Authorization: `Bearer ${userInfo?.token}`
            }
        };
        
        const { data } = await axios.post<Product>(`/api/products/create/`, {}, config);
        
        dispatch({
            type: ProductCreateActionTypes.PRODUCT_CREATE_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: ProductCreateActionTypes.PRODUCT_CREATE_FAILURE,
            payload: errorHandler(error)
        });
    }
};

export const updateProduct = (product: UpdateProductInput): AppThunk => async (
    dispatch,
    getState
) => {
    try {
        dispatch({ type: ProductUpdateActionTypes.PRODUCT_UPDATE_REQUEST });
        
        const { userInfo } = getState().userLogin;
        
        const config = {
            headers: {
                'Content-Type': 'Application/json',
                Authorization: `Bearer ${userInfo?.token}`
            }
        };

        const { data } = await axios.put<Product>(
            `/api/products/update/${product._id}`,
            product,
            config
        );

        dispatch({
            type: ProductUpdateActionTypes.PRODUCT_UPDATE_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: ProductUpdateActionTypes.PRODUCT_UPDATE_FAILURE,
            payload: errorHandler(error)
        });
    }
};

export const listTopProducts = (): AppThunk => async (dispatch) => {
	try {
		dispatch({ type: ProductTopActionTypes.PRODUCT_TOP_REQUEST });
		
        const { data } = await axios.get<Product[]>(`/api/products/top/`);
		
        dispatch({
			type: ProductTopActionTypes.PRODUCT_TOP_SUCCESS,
			payload: data
		});
	} catch (error) {
		dispatch({
			type: ProductTopActionTypes.PRODUCT_TOP_FAILURE,
			payload: errorHandler(error)
		});
	}
};
