import { AuthAction, AuthActionTypes, ILoginResponse, IRegisterModel, ILogoutResponse, IUser } from '../../types/auth';
import {Dispatch} from "react";
import http from '../../http_common';

export interface ILoginModel {
    email: string,
    password: string
}

export const loginUser = (data: ILoginModel) => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
            dispatch({type: AuthActionTypes.LOGIN_AUTH});
            const response = await http.post<ILoginResponse>('api/auth/login', data);
            dispatch({type: AuthActionTypes.LOGIN_AUTH_SUCCESS, payload: response.data.user});
        }
        catch(error) {
            dispatch({type: AuthActionTypes.LOGIN_AUTH_ERROR, payload: "Error login"});
        }
    }
}

export const registerUser = (data: IRegisterModel) => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
            dispatch({type: AuthActionTypes.REGISTER_AUTH});
            const response = await http.post<ILoginResponse>('api/auth/register', data);
            dispatch({type: AuthActionTypes.LOGIN_AUTH_SUCCESS, payload: response.data.user});
        } catch (error) {
            dispatch({type: AuthActionTypes.REGISTER_AUTH_ERROR, payload: "Error register"})
        }
    }
}

export const logoutUser = () => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
            dispatch({type: AuthActionTypes.LOGOUT_AUTH});
            const response = await http.post<ILogoutResponse>('api/auth/logout');
            dispatch({type: AuthActionTypes.LOGOUT_AUTH_SUCCESS, payload: response.data});
        } catch (error) {
            dispatch({type: AuthActionTypes.LOGOUT_AUTH_ERROR, payload: "Error logout"})
        }
    }
}

export const getAuthUser = () => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
            //dispatch({type: AuthActionTypes.REGISTER_AUTH});
            const response = await http.get<IUser>('api/auth/user-profile');
            dispatch({type: AuthActionTypes.GET_AUTH, payload: response.data});
        } catch (error) {
            dispatch({type: AuthActionTypes.GET_AUTH_ERROR, payload: "Error get user"})
        }
    }
}