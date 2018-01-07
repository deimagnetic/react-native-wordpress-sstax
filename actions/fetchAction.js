//fetch http
import { HTTP_URL } from '../config'
export const FETCH_SUCCESS = 'FETCH_SUCCESS'
export const FETCH_ERROR = 'FETCH_ERROR'
import { showLoading, hideLoading } from './appAction'

export function postRequest(req) {
    console.warn('postRequest:' + JSON.stringify(req))
    return function (dispatch) {
        //dispatch(showLoading());
        return fetchData(req).then(([response,json]) => {
            //dispatch(hideLoading());
            if (response.status === 200) {
                console.warn(JSON.stringify(response))
                dispatch(req.callback(JSON.parse(response._bodyText)))
            }
            else {
                dispatch(postRequestError())
            }
        }).catch(error => console.warn(error) )
    }
}

export function postJsonRequest(req) {
    console.warn('postJsonRequest:' + JSON.stringify(req))
    return function (dispatch) {
        //dispatch(showLoading());
        return fetchJsonData(req).then(([response, json]) => {
            //dispatch(hideLoading());
            if (response.status === 200) {
                console.warn(JSON.stringify(response))
                dispatch(req.callback(JSON.parse(response._bodyInit)))
            }
            else {
                dispatch(postRequestError())
            }
        }).catch(error => console.warn(error))
    }
}

function fetchPostsSuccess(payload) {
    return {
        type: "FETCH_SUCCESS",
        payload
    }
}

function fetchPostsError() {
    return {
        type: "FETCH_ERROR"
    }
}

// Rough implementation. Untested.
function timeout(ms, promise) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      reject(new Error("timeout"))
    }, ms)
    promise.then(resolve, reject)
  })
}

function fetchData(req) {
    req.token = req.token || undefined;
    var obj = { method: req.method }
    if (req.method == "POST") {
        obj = {
            method: req.method,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-token': req.token
            },
            body: Object.keys(req.data).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(req.data[key])).join('&')
        }
    }
    console.warn(JSON.stringify(obj))

    return fetch(req.url, obj)
        .then(response => Promise.all([response])
        .catch((err) => { console.warn(err.message) }))
        .catch(error => error);
}

function fetchJsonData(req) {
    req.token = req.token || undefined;
    var obj = {
        method: req.method
    }
    if (req.method == "POST") {
        obj = {
            method: req.method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-token': req.token
            },
            body: JSON.stringify(req.data)
        }
    }
    console.warn(JSON.stringify(obj))

    return fetch(req.url, obj)
        .then(response => Promise.all([response])
        .catch((err) => { console.warn('fetchJsonData catch error :'+err.message) }))
        .catch(error => console.warn('fetchJsonData error :' + error));
}
