import * as AuthActionCreators from '../../components/auth/Login/actions';
import * as RegisterActionCreators from '../../components/auth/Register/actions'

export default {
    ...AuthActionCreators,
    ...RegisterActionCreators,
}