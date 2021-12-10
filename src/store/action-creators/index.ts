import * as AuthActionCreators from '../../components/auth/Login/actions';
import * as RegisterActionCreators from '../../components/auth/Register/actions'
import * as AutoActionCreators from '../../components/Auto/AutoList/actions'
import * as AddAutoActionCreators from '../../components/Auto/AddAuto/actions'

export default {
    ...AuthActionCreators,
    ...RegisterActionCreators,
    ...AutoActionCreators,
    ...AddAutoActionCreators,
}