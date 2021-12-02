import { IUser } from "../Login/types";


export interface IRegisterModel {
    name: string,
    email: string,
    password: string,
    password_confirmation: string,
}

export type ServerRegisterError = {
    name: Array<string>,
    email: Array<string>, 
    password: Array<string>, 
    password_confirmation: Array<string>, 
    error: string 
};

export interface IRegisterState {
    message: string,
    user: null|IUser
}

export enum RegisterActionTypes {
    REGISTER_AUTH_SUCCESS = "REGISTER_AUTH_SUCCESS"
}

export interface IRegisterResponse {
    message: string,
    user: IUser
}

export interface RegisterAuthSuccessAction {
    type: RegisterActionTypes.REGISTER_AUTH_SUCCESS,
    payload: string,
}



export type RegisterAction = RegisterAuthSuccessAction;