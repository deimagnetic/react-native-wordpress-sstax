export const SHOW_LOADING = 'SHOW_LOADING'
export const HIDE_LOADING = 'HIDE_LOADING'

export function showLoading(payload) {
    return {
        type: SHOW_LOADING,
        payload
    }
}

export function hideLoading(payload) {
    return {
        type: HIDE_LOADING,
        payload
    }
}