import {ProductActions, ProductsActionTypes, ProductsState} from './types';

const initialState : ProductsState = {
    products: [],
    last_page: 0
}

export const ProductsReducer = (state = initialState, action: ProductActions) => {
    switch(action.type) {

        case ProductsActionTypes.FETCH_PRODUCTS:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
    
}