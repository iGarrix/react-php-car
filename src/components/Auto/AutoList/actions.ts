import { AutoAction, AutoActionTypes, 
    IAutoResponse} from './types';
import {Dispatch} from "react";
import http from '../../../http_common';
import axios, { AxiosError } from "axios";
import jwt from 'jsonwebtoken';


export const getAuto = () => {
    return async (dispatch: Dispatch<AutoAction>) => {
        try {
            dispatch({type: AutoActionTypes.GET_AUTO});
            const response = await http.get<IAutoResponse>('api/products/index');
            dispatch({type: AutoActionTypes.GET_AUTO_SUCCESS, payload: response.data.data});

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
