import { AuthAction, AuthActionTypes, 
    ILoginResponse, ILoginModel,
    ServerLoginError } from './types';
import {Dispatch} from "react";
import http from '../../../http_common';
import axios, { AxiosError } from "axios";



export const loginUser = (data: ILoginModel) => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
            const response = await http.post<ILoginResponse>('api/auth/login', data);
            dispatch({type: AuthActionTypes.LOGIN_AUTH_SUCCESS, payload: response.data.user});
            return Promise.resolve();
        }
        catch(error) {
            if (axios.isAxiosError(error)) {
                console.log("Action problem", error);
                const serverError = error as AxiosError<ServerLoginError>;
                if (serverError && serverError.response) {
                    return Promise.reject(serverError.response.data);
                }
            }
            //return { errorMessage: "Kuch to ghotala h" };
            
        }
    }
}