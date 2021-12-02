import { RegisterAction, RegisterActionTypes, IRegisterState } from './types';

const inialState : IRegisterState = {
    message: "",
    user: null,
}

export const registerReducer = (state=inialState, action: RegisterAction) : IRegisterState => {
    switch(action.type) {
       
        case RegisterActionTypes.REGISTER_AUTH_SUCCESS: {
            return {
                ...state,
                message: action.payload,
            };
        }
       
        default:
            return state;
    }
}