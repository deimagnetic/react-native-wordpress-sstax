import { SHOW_LOADING, HIDE_LOADING } from '../actions/appAction'
import { Actions, ActionConst } from 'react-native-router-flux'

export function appReducer(state = { isLoading: false }, action) {
    switch (action.type) {
        case 'SHOW_LOADING':
            return Object.assign({}, state, {
                isLoading: true
            })
        case 'HIDE_LOADING':
            return Object.assign({}, state, {
                isLoading: false
            })
        default:
            return state
    }
}