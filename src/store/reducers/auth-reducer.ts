import { AuthAction, AuthActionTypes, AuthState } from '../../types/auth';

const inialState : AuthState = {
    user: null,
    isAuth: false,
    loading: false,
    error:null
}

export const authReducer = (state=inialState, action: AuthAction) : AuthState => {
    switch(action.type) {
        case AuthActionTypes.LOGIN_AUTH: {
            return {
                ...state, loading: true
            }
        }
        case AuthActionTypes.LOGIN_AUTH_SUCCESS: {
            return {
                ...state, 
                    loading: false, 
                    isAuth: true, 
                    user: action.payload
            };
        }
        case AuthActionTypes.LOGIN_AUTH_ERROR: {
            return {
                ...state, loading: false, error: action.payload
            }
        }
        case AuthActionTypes.REGISTER_AUTH: {
            return {
                ...state, loading: true
            }
        }
        case AuthActionTypes.REGISTER_AUTH_SUCCESS: {
            return {
                ...state, 
                    loading: false, 
                    isAuth: true, 
                    user: action.payload
            };
        }
        case AuthActionTypes.REGISTER_AUTH_ERROR: {
            return {
                ...state, loading: false, error: action.payload
            }
        }
        case AuthActionTypes.LOGOUT_AUTH: {
            return {
                ...state, user: null
            }
        }
        case AuthActionTypes.LOGOUT_AUTH_SUCCESS: {
            return {
                ...state,
            };
        }
        case AuthActionTypes.LOGOUT_AUTH_ERROR: {
            return {
                ...state, loading: false, error: action.payload
            }
        }
        case AuthActionTypes.GET_AUTH: {
            return {
                ...state, user: action.payload
            }
        }
        case AuthActionTypes.GET_AUTH_SUCCESS: {
            return {
                ...state, 
            };
        }
        case AuthActionTypes.GET_AUTH_ERROR: {
            return {
                ...state, loading: false, error: action.payload
            }
        }


        
        default:
            return state;
    }
}