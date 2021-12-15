import { ProfileAction, ProfileActionTypes, ProfileState } from "./types";


const initialState : ProfileState = {
    profile: null
}

export const ProfileReducer = (state = initialState, action: ProfileAction) : ProfileState => {
    switch(action.type) {

        case ProfileActionTypes.FETCH_PROFILE:
            return {
                ...state,
                profile: action.payload
            };
        default:
            return state;
    }
    
}