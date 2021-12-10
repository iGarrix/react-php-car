import { IAutoModel } from "../AddAuto/types";

export enum AutoActionTypes {
    GET_AUTO_SUCCESS = "GET_AUTO_SUCCESS",
    GET_AUTO = "GET_AUTO",
    ADD_AUTO_SUCCESS = "ADD_AUTO_SUCCESS",
}

export interface IAuto {
    id: number,
    name: string,
    detail: string
}

export interface AutoState {
    auto: null| Array<IAuto>,
    loading: boolean
}

export interface IAutoResponse {
    success: boolean,
    message: string,
    data: Array<IAuto>,
}

export interface GetAutoActionAction {
    type: AutoActionTypes.GET_AUTO
}
export interface GetAutoActionSuccessAction {
    type: AutoActionTypes.GET_AUTO_SUCCESS,
    payload: Array<IAuto>
}
export interface AddAutoActionSuccessAction {
    type: AutoActionTypes.ADD_AUTO_SUCCESS,
    payload: IAuto
}

export type AutoAction = GetAutoActionAction | GetAutoActionSuccessAction | AddAutoActionSuccessAction;