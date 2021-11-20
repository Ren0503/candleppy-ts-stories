import { Product } from './Product';

export interface ProductDetailState {
    loading: boolean;
    product?: Product;
    error?: undefined;
}

export enum ProductDetailActionTypes {
    PRODUCT_DETAIL_REQUEST = 'PRODUCT_DETAIL_REQUEST',
    PRODUCT_DETAIL_SUCCESS = 'PRODUCT_DETAIL_SUCCESS',
    PRODUCT_DETAIL_FAILURE = 'PRODUCT_DETAIL_FAILURE'
}

export interface FetchProductRequestAction {
    type: ProductDetailActionTypes.PRODUCT_DETAIL_REQUEST;
}

export interface FetchProductSuccessAction {
    type: ProductDetailActionTypes.PRODUCT_DETAIL_SUCCESS;
    payload: Product;
}

export interface FetchProductFailureAction {
    type: ProductDetailActionTypes.PRODUCT_DETAIL_FAILURE;
    payload: any;
}

export type ProductDetailAction =
    | FetchProductSuccessAction
    | FetchProductFailureAction
    | FetchProductRequestAction;
