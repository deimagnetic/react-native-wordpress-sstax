import {
    TOGGLE_SIDE_MENU
} from '../actions/menuAction'

export function sideMenuReducer(state = { isOpen: false }, action) {
    switch (action.type) {
        case 'TOGGLE_SIDE_MENU':
            //console.warn('TOGGLE_SIDE_MENU reducer')
            return Object.assign({}, state, {
                isOpen: !action.payload
            })
        default:
            return state
    }
}