import * as AuthActionCreators from '../../components/auth/Login/actions';
import * as RegisterActionCreators from '../../components/auth/Register/actions'
import * as ProductActionCreators from '../../components/products/actions';
import * as ProfileActionCreators from '../../components/MyProfile/actions';

export default {
    ...AuthActionCreators,
    ...RegisterActionCreators,
    ...ProductActionCreators,
    ...ProfileActionCreators,
}