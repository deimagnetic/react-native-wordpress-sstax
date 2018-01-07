import { combineReducers } from 'redux'
import { appReducer } from './reducers/appReducer'
import { userReducer } from './reducers/userReducer'
import { sideMenuReducer } from './reducers/sideMenuReducer'

const MainReducer = combineReducers({
    app: appReducer,
    sideMenu: sideMenuReducer,
    user: userReducer,
})

const rootReducer = (state, action) => {
    if (action.type === 'LOGOUT_USER') {
        state = undefined
    }

    return MainReducer(state, action)
}

export default rootReducer