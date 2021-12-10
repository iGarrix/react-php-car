import { AutoAction, AutoActionTypes, AutoState, IAuto } from './types';

const inialState : AutoState = {
    auto: null,
    loading: false,

}

export const autoReducer = (state=inialState, action: AutoAction) : AutoState => {
    switch(action.type) {
        case AutoActionTypes.GET_AUTO: {
            return {
                ...state, 
                    loading: true
            };
        }
        case AutoActionTypes.GET_AUTO_SUCCESS: {
            return {
                ...state, 
                    loading: false, 
                    auto: action.payload
            };
        }
        case AutoActionTypes.ADD_AUTO_SUCCESS: {
            const list = state.auto;
            list?.push(action.payload);
            return {
                ...state, 
                    auto: list
            };
        }
       
        default:
            return state;
    }
}