export interface ILoginModel {
    email: string,
    password: string
}

export type ServerLoginError = {
    email: Array<string>, 
    password: Array<string>, 
    error: string 
};

export enum AuthActionTypes {
    LOGIN_AUTH_SUCCESS = "LOGIN_AUTH_SUCCESS"
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

export interface AuthState {
    user: null|IUser,
    isAuth: boolean
}

export interface LoginAuthSuccessAction {
    type: AuthActionTypes.LOGIN_AUTH_SUCCESS,
    payload: IUser
}



export type AuthAction = LoginAuthSuccessAction;