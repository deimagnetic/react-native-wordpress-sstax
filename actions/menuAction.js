export const TOGGLE_SIDE_MENU = 'TOGGLE_SIDE_MENU'

export function toggleSideMenu(payload) {
    return {
        type: TOGGLE_SIDE_MENU,
        payload
    }
}