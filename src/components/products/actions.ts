import { Dispatch } from "react";
import { isUndefined } from "util";
import http from "../../http_common";
import { ProductActions, IProductsResponse, ProductsActionTypes, IProductSearch, IProductModel } from "./types";

export const fetchProducts = (search: IProductSearch) => {
  return async (dispatch: Dispatch<ProductActions>) => {
    try {
      const response = await http.get<IProductsResponse>("api/products/index", {
        params: search
      });
      const { data, last_page } = response.data;
      console.log(data);
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
        const response = await http.post<IProductsResponse>("api/products/store", data, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }});
        console.log(response);
        return Promise.resolve();
      }
    } catch (ex) {
      console.log(ex);
      console.log("Problem fetch");
      return Promise.reject();
    }
  };
};