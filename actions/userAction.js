import {
    Platform
} from 'react-native'
//
import Config from '../app.json';

export const LOGIN_USER = 'LOGIN_USER'
export const LOGOUT_USER = 'LOGOUT_USER'
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS'
export const LOGIN_USER_FAIL = 'LOGIN_USER_FAIL'
export const LOAD_REMEMBER_USER = 'LOAD_REMEMBER_USER'
export const REMEMBER_USER = 'REMEMBER_USER'

export function loginUserDone(payload) {
    //先做版本檢查
    if (Platform.OS === 'ios'){
        if(parseInt(payload.version.employeeApp) > parseInt(Config.expo.ios.buildNumber) ){
            payload.flag = 0
            payload.versionMessage = '您的App版本已經過期，請更新至最新版本'
            payload.versionUrl = 'http://www.language-center.com.tw'
        }
    }else{
        if(parseInt(payload.version.employeeApp) > parseInt(Config.expo.android.versionCode) ){
            payload.flag = 0
            payload.versionMessage = '您的App版本已經過期，請更新至最新版本'
            payload.versionUrl = 'http://www.language-center.com.tw'
        }
    }

    if(payload.flag == 1){
        return {
            type: LOGIN_USER_SUCCESS,
            payload
        }
    }else{
        return {
            type: LOGIN_USER_FAIL,
            payload
        }
    }
}

export function logoutUser(payload) {
    return {
        type: LOGOUT_USER,
        payload
    }
}

export function rememberUser(payload) {
    return {
        type: REMEMBER_USER,
        payload
    }
}

export function loadRememberUser(payload) {
    return {
        type: LOAD_REMEMBER_USER,
        payload
    }
}