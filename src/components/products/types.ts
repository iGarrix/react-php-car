export enum ProductsActionTypes {
    FETCH_PRODUCTS="FETCH_PRODUCTS",
    EDIT_PRODUCTS="EDIT_PRODUCTS",
    UPDATE_EDIT_PRODUCT="UPDATE_EDIT_PRODUCT",
    DELETE_PRODUCT="DELETE_PRODUCT",
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

export interface IEditData {
    name: string,
    detail: string,
}

export interface IProductsResponse {
    current_page: number;
    last_page: number;
    data: Array<IProductItem>;
}

export interface IProductResponse {
    data: IProductItem;
}

export interface IProductSearch {
    page?: null|string|number,
    name?: null|string
}

export interface ProductsState {
    products: Array<IProductItem>;
    edit_product: IProductItem | null;
    last_page: number;
}

export interface FetchProductData {
    products: Array<IProductItem>;
    last_page: number;
}

export interface FetchProductsAction {
    type: ProductsActionTypes.FETCH_PRODUCTS,
    payload: FetchProductData
}
export interface FetchEditProductsAction {
    type: ProductsActionTypes.EDIT_PRODUCTS,
    payload: IProductItem
}
export interface UpdateEditProductsAction {
    type: ProductsActionTypes.UPDATE_EDIT_PRODUCT,
    payload: IProductItem
}

export interface DeleteProductsAction {
    type: ProductsActionTypes.DELETE_PRODUCT,
    payload: number | string
}

export type ProductActions = FetchProductsAction | FetchEditProductsAction | UpdateEditProductsAction | DeleteProductsAction;