import { combineReducers } from "redux";
import { authReducer } from "../../components/auth/Login/reducer";
import { registerReducer } from "../../components/auth/Register/reducer";
import { ProfileReducer } from "../../components/MyProfile/reducer";
import { ProductsReducer } from "../../components/products/reducer";

export const rootReducer = combineReducers({
    auth: authReducer,
    register: registerReducer,
    product: ProductsReducer,
    profile: ProfileReducer,
});

export type RootState = ReturnType<typeof rootReducer>;