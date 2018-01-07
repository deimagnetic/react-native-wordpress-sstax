import { LOGIN } from '../actions/userAction'
import { Actions } from 'react-native-router-flux'

export function userReducer(state = {
    tuser: '',
    pw: '',
    emp_no: '',
    os: '',
    remember: false,
    token: '',
    name: '',
    ename: '',
    email: '',
    xgname: '',
    xjob_name: '',
    loginFail: false,
    versionMessage: '',
    versionUrl: ''
}, action) {
    switch (action.type) {
        case 'LOGIN_USER_SUCCESS':
            console.warn('LOGIN_USER_SUCCESS reducer' + JSON.stringify(action.payload))
            //Actions.home({ type: 'replace' })
            return Object.assign({}, state, {
                token: action.payload.token,
                tuser: action.payload.tuser,
                pw: action.payload.pw,
                emp_no: action.payload.xemp_no,
                os: action.payload.os,
                name: action.payload.xname,
                ename: action.payload.xename,
                email: action.payload.xemail,
                xgname: action.payload.xgname,
                xjob_name: action.payload.xjob_name,
                loginFail: false,
                versionMessage: '',
                versionUrl: ''
            })
        case 'LOGIN_USER_FAIL':
            console.warn('LOGIN_USER_FAIL reducer' + JSON.stringify(action.payload))
            //Actions.refresh()
            return Object.assign({}, state, {
                loginFail: true,
                versionMessage: action.payload.versionMessage,
                versionUrl: action.payload.versionUrl
            })
        case 'LOAD_REMEMBER_USER':
            //console.warn('LOAD_REMEMBER_USER reducer' + JSON.stringify(action.payload))
            return Object.assign({}, state, action.payload)
        case 'REMEMBER_USER':
            //console.warn('REMEMBER_USER reducer' + JSON.stringify(action.payload))
            return Object.assign({}, state, action.payload)
        default:
            return state
    }
}