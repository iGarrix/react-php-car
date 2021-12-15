export enum ProductsActionTypes {
    FETCH_PRODUCTS="FETCH_PRODUCTS"
}

export interface IProductItem {
    id: number;
    name: string;
    detail: string;
    image: string;
} 

export interface IProductModel {
    name: string,
    detail: string,
    file?: File,
}

export type ServerProductError = {
    name: Array<string>,
    detail: Array<string>, 
    file: Array<File>, 
    error: string 
};

export interface IProductsResponse {
    current_page: number;
    last_page: number;
    data: Array<IProductItem>;
}

export interface IProductSearch {
    page?: null|string|number,
    name?: null|string
}

export interface ProductsState {
    products: Array<IProductItem>;
    last_page: number;
}


export interface FetchProductsAction {
    type: ProductsActionTypes.FETCH_PRODUCTS,
    payload: ProductsState
}

export type ProductActions = FetchProductsAction;