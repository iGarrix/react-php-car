import { combineReducers } from "redux";
import { authReducer } from "../../components/auth/Login/reducer";
import { registerReducer } from "../../components/auth/Register/reducer";
import { autoReducer } from "../../components/Auto/AutoList/reducer";

export const rootReducer = combineReducers({
    auth: authReducer,
    register: registerReducer,
    auto: autoReducer,
});

export type RootState = ReturnType<typeof rootReducer>;