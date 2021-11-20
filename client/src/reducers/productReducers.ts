import {
    ProductListAction,
    ProductListActionTypes,
    ProductListState,
    ProductDetailAction,
    ProductDetailActionTypes,
    ProductDetailState,
    ProductDeleteAction,
    ProductDeleteActionTypes,
    ProductDeleteState,
    ProductCreateState,
    ProductCreateAction,
    ProductCreateActionTypes,
    ProductUpdateAction,
    ProductUpdateState,
    ProductUpdateActionTypes,
    ProductTopState,
    ProductTopAction,
    ProductTopActionTypes
} from 'types/products';

const initialProductListState: ProductListState = {
    products: [],
    loading: false
};

export const productListReducer = (
    state: ProductListState = initialProductListState,
    action: ProductListAction
) => {
    switch (action.type) {
        case ProductListActionTypes.PRODUCT_LIST_REQUEST:
            return { loading: true, products: initialProductListState.products };
        case ProductListActionTypes.PRODUCT_LIST_SUCCESS:
            return {
                loading: initialProductListState.loading,
                products: action.payload.products,
                pages: action.payload.pages,
                page: action.payload.page
            };
        case ProductListActionTypes.PRODUCT_LIST_FAILURE:
            return {
                loading: initialProductListState.loading,
                products: initialProductListState.products,
                error: action.payload
            };
        default:
            return state;
    }
};

const initialProductDetailState: ProductDetailState = {
    loading: false
};

export const productDetailReducer = (
    state: ProductDetailState = initialProductDetailState,
    action: ProductDetailAction
) => {
    switch (action.type) {
        case ProductDetailActionTypes.PRODUCT_DETAIL_REQUEST:
            return { loading: true, product: initialProductDetailState.product };
        case ProductDetailActionTypes.PRODUCT_DETAIL_SUCCESS:
            return {
                loading: initialProductDetailState.loading,
                product: action.payload
            };
        case ProductDetailActionTypes.PRODUCT_DETAIL_FAILURE:
            return {
                loading: initialProductDetailState.loading,
                product: initialProductDetailState.product,
                error: action.payload
            };
        default:
            return state;
    }
};

const initialProductDeleteState: ProductDeleteState = {
    loading: false
};

export const productDeleteReducer = (
    state: ProductDeleteState = initialProductDeleteState,
    action: ProductDeleteAction
) => {
    switch (action.type) {
        case ProductDeleteActionTypes.PRODUCT_DELETE_REQUEST:
            return { loading: true };
        case ProductDeleteActionTypes.PRODUCT_DELETE_SUCCESS:
            return {
                loading: initialProductDeleteState.loading,
                success: true
            };
        case ProductDeleteActionTypes.PRODUCT_DELETE_FAILURE:
            return {
                error: action.payload
            };
        default:
            return state;
    }
};

const initialProductCreateState: ProductCreateState = {
    loading: false
};

export const productCreateReducer = (
    state: ProductCreateState = initialProductCreateState,
    action: ProductCreateAction
) => {
    switch (action.type) {
        case ProductCreateActionTypes.PRODUCT_CREATE_REQUEST:
            return { loading: true };
        case ProductCreateActionTypes.PRODUCT_CREATE_SUCCESS:
            return {
                loading: initialProductCreateState.loading,
                success: true,
                product: action.payload
            };
        case ProductCreateActionTypes.PRODUCT_CREATE_FAILURE:
            return {
                error: action.payload
            };
        case ProductCreateActionTypes.PRODUCT_CREATE_RESET:
            return {};
        default:
            return state;
    }
};

const initialProductUpdateState: ProductUpdateState = {
    loading: false
};

export const productUpdateReducer = (
    state: ProductUpdateState = initialProductUpdateState,
    action: ProductUpdateAction
) => {
    switch (action.type) {
        case ProductUpdateActionTypes.PRODUCT_UPDATE_REQUEST:
            return { loading: true };
        case ProductUpdateActionTypes.PRODUCT_UPDATE_SUCCESS:
            return {
                loading: initialProductUpdateState.loading,
                success: true,
                product: action.payload
            };
        case ProductUpdateActionTypes.PRODUCT_UPDATE_FAILURE:
            return {
                error: action.payload
            };
        case ProductUpdateActionTypes.PRODUCT_UPDATE_RESET:
            return {};
        default:
            return state;
    }
};

const initialProductTopState: ProductTopState = {
    products: [],
    loading: false
};

export const productTopRatedReducer = (
    state: ProductTopState = initialProductTopState,
    action: ProductTopAction
) => {
    switch (action.type) {
        case ProductTopActionTypes.PRODUCT_TOP_REQUEST:
            return { loading: true, products: initialProductTopState.products };
        case ProductTopActionTypes.PRODUCT_TOP_SUCCESS:
            return {
                loading: initialProductTopState.loading,
                products: action.payload
            };
        case ProductTopActionTypes.PRODUCT_TOP_FAILURE:
            return {
                products: initialProductListState.products,
                error: action.payload
            };
        default:
            return state;
    }
};
