import { act } from 'react-dom/test-utils';
import {ProductActions, ProductsActionTypes, ProductsState} from './types';

const initialState : ProductsState = {
    products: [],
    edit_product: null,
    last_page: 0
}

export const ProductsReducer = (state = initialState, action: ProductActions) => {
    switch(action.type) {

        case ProductsActionTypes.FETCH_PRODUCTS:
            return {
                ...state,
                ...action.payload
            };
        case ProductsActionTypes.EDIT_PRODUCTS:
            return {
                ...state,
                edit_product: action.payload
            };
        case ProductsActionTypes.UPDATE_EDIT_PRODUCT:
            const list = state.products.map(u => u.id !== action.payload.id ? u : action.payload);
            return {
                ...state,
                products: list,
            };
        case ProductsActionTypes.DELETE_PRODUCT:
            const deletelist = state.products.filter(f => f.id !== action.payload);
            return {
                ...state,
                products: deletelist,
            };
        default:
            return state;
    }
    
}