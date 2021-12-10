import { AutoAction, AutoActionTypes, 
    IAuto, IAutoResponse, GetAutoActionAction} from '../AutoList/types';
import {Dispatch} from "react";
import http from '../../../http_common';
import axios, { AxiosError } from "axios";
import jwt from 'jsonwebtoken';
import { IAutoModel } from './types';


export const addAuto = (data: IAutoModel) => {
    return async (dispatch: Dispatch<AutoAction>) => {
        try {
            const response = await http.post<any>('api/products/store', data);
            dispatch({type: AutoActionTypes.ADD_AUTO_SUCCESS, payload: response.data.data});

            return Promise.resolve();
        }
        catch(error) {
            if (axios.isAxiosError(error)) {
                console.log("Action problem", error);
                const serverError = error as AxiosError<any>;
                if (serverError && serverError.response) {
                    return Promise.reject(serverError.response.data);
                }
            }         
        }
    }
}
