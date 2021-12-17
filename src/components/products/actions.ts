import { Dispatch } from "react";
import http from "../../http_common";
import { ProductActions, IProductsResponse, ProductsActionTypes, IProductSearch, IProductModel, IProductResponse } from "./types";

export const fetchProducts = (search: IProductSearch) => {
  return async (dispatch: Dispatch<ProductActions>) => {
    try {
      const response = await http.get<IProductsResponse>("api/products/index", {
        params: search
      });
      const { data, last_page } = response.data;
      dispatch({
        type: ProductsActionTypes.FETCH_PRODUCTS,
        payload: {
          products: data,
          last_page: last_page
        },
      });
      return Promise.resolve();
    } catch (ex) {
      console.log("Problem fetch");
      return Promise.reject();
    }
  };
};

export const addProducts = (data: IProductModel) => {
  return async () => {
    try {
      if (data.file !== undefined) {   
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("detail", data.detail);
        formData.append("file", data.file);
        const response = await http.post<IProductsResponse>("api/products/store", formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }});
        return Promise.resolve();
      }
    } catch (ex) {
      console.log(ex);
      console.log("Problem fetch");
      return Promise.reject();
    }
  };
};

export const findProducts = (data: any) => {
  return async (dispatch: Dispatch<ProductActions>) => {
    try {  
      const response = await http.get<IProductResponse>("api/products/find/" + data);
      dispatch({
        type: ProductsActionTypes.EDIT_PRODUCTS,
        payload: response.data.data,
      })
      return Promise.resolve();

    } catch (ex) {
      console.log(ex);
      console.log("Problem fetch");
      return Promise.reject();
    }
  };
};

export const editProducts = (id: any, data: any) => {
  return async (dispatch: Dispatch<ProductActions>) => {
    try {  
     const response = await http.put<IProductResponse>("api/products/edit/" + id, data);
     dispatch({
      type: ProductsActionTypes.EDIT_PRODUCTS,
      payload: response.data.data,
      });
      dispatch({
        type: ProductsActionTypes.UPDATE_EDIT_PRODUCT,
        payload: response.data.data,
        })
      return Promise.resolve();
    } catch (ex) {
      console.log(ex);
      console.log("Problem fetch");
      return Promise.reject();
    }
  };
};

export const deleteProducts = (id: any) => {
  return async (dispatch: Dispatch<ProductActions>) => {
    try {  
     await http.delete<IProductResponse>("api/products/delete/" + id);
     dispatch({
      type: ProductsActionTypes.DELETE_PRODUCT,
      payload: id
      });
      return Promise.resolve();
    } catch (ex) {
      console.log(ex);
      console.log("Problem fetch");
      return Promise.reject();
    }
  };
};