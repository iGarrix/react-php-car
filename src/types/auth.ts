export enum AuthActionTypes {
    LOGIN_AUTH = "LOGIN_AUTH",
    LOGIN_AUTH_SUCCESS = "LOGIN_AUTH_SUCCESS",
    LOGIN_AUTH_ERROR = "LOGIN_AUTH_ERROR",

    REGISTER_AUTH = "REGISTER_AUTH",
    REGISTER_AUTH_SUCCESS = "REGISTER_AUTH_SUCCESS",
    REGISTER_AUTH_ERROR = "REGISTER_AUTH_ERROR",

    LOGOUT_AUTH = "LOGOUT_AUTH",
    LOGOUT_AUTH_SUCCESS = "LOGOUT_AUTH_SUCCESS",
    LOGOUT_AUTH_ERROR = "LOGOUT_AUTH_ERROR",

    GET_AUTH = "GET_AUTH",
    GET_AUTH_SUCCESS = "GET_AUTH_SUCCESS",
    GET_AUTH_ERROR = "GET_AUTH_ERROR",
}

export interface IUser {
    email: string,
    image: string
}

export interface ILoginResponse {
    access_token: string,
    expires_in: number,
    user: IUser
}

export interface ILogoutResponse {
    message: string,
}

export interface IRegisterModel {
    name: string,
    email: string,
    password: string,
    password_confirmation: string,
}

export interface AuthState {
    user: null|IUser,
    isAuth: boolean,
    loading: boolean,
    error: null|string
}

export interface LoginAuthAction {
    type: AuthActionTypes.LOGIN_AUTH
}

export interface LoginAuthSuccesAction {
    type: AuthActionTypes.LOGIN_AUTH_SUCCESS,
    payload: IUser
}

export interface LoginAuthErrorAction {
    type: AuthActionTypes.LOGIN_AUTH_ERROR,
    payload: string
}

export interface RegisterAuthAction {
    type: AuthActionTypes.REGISTER_AUTH
}

export interface RegisterAuthSuccesAction {
    type: AuthActionTypes.REGISTER_AUTH_SUCCESS,
    payload: IUser
}

export interface RegisterAuthErrorAction {
    type: AuthActionTypes.REGISTER_AUTH_ERROR,
    payload: string
}

export interface LogoutAuthAction {
    type: AuthActionTypes.LOGOUT_AUTH,
}

export interface LogoutAuthSuccesAction {
    type: AuthActionTypes.LOGOUT_AUTH_SUCCESS,
    payload: ILogoutResponse,
}

export interface LogoutAuthErrorAction {
    type: AuthActionTypes.LOGOUT_AUTH_ERROR,
    payload: string
}

export interface GetAuth {
    type: AuthActionTypes.GET_AUTH,
    payload: IUser
}
export interface GetAuthError {
    type: AuthActionTypes.GET_AUTH_ERROR,
    payload: string
}
export interface GetAuthSuccess {
    type: AuthActionTypes.GET_AUTH_SUCCESS,
    payload: string
}

export type AuthAction = LoginAuthAction | LoginAuthSuccesAction | LoginAuthErrorAction
| RegisterAuthAction | RegisterAuthSuccesAction | RegisterAuthErrorAction 
| LogoutAuthAction | LogoutAuthSuccesAction | LogoutAuthErrorAction 
| GetAuth | GetAuthSuccess | GetAuthError;