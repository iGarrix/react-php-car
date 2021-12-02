import {IRegisterResponse, IRegisterModel, ServerRegisterError, RegisterAction, RegisterActionTypes} from './types';
import {Dispatch} from "react";
import http from '../../../http_common';
import axios, { AxiosError } from "axios";



export const registerUser = (data: IRegisterModel) => {
    return async (dispatch: Dispatch<RegisterAction>) => {
        try {
            const response = await http.post<IRegisterResponse>('api/auth/register', data);
            dispatch({type: RegisterActionTypes.REGISTER_AUTH_SUCCESS, payload: response.data.message});
            return Promise.resolve();
        }
        catch(error) {
            if (axios.isAxiosError(error)) {
                console.log("Action problem", error);
                const serverError = error as AxiosError<ServerRegisterError>;
                if (serverError && serverError.response) {
                    return Promise.reject(serverError.response.data);
                }
            }           
        }
    }
}