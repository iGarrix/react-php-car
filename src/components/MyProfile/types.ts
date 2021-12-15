export enum ProfileActionTypes {
    FETCH_PROFILE = "FETCH_PROFILE"
}

export interface IProfile {
    name: string,
    email: string,
}

export interface ProfileState {
    profile: null | IProfile,
} 

export interface FetchProductsAction {
    type: ProfileActionTypes.FETCH_PROFILE,
    payload: IProfile
}

export type ProfileAction = FetchProductsAction;