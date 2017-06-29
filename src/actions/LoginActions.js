import { LOGIN_SUCCESS, ERROR, LOG_OUT } from '../constants/LoginConst'
import axios from 'axios'
import { browserHistory } from 'react-router'

function loginAction(user) {
    return ({
        type: LOGIN_SUCCESS,
        user
    })
}
function userError(error) {
    return {
        type: ERROR,
        error
    }
}


export function logout() {
    browserHistory.push('/')
    localStorage.removeItem('access_token')
    return {
        type: LOG_OUT
    }
}
export function initAuth() {
    return dispatch => {
        const accessToken = localStorage.getItem('access_token')
        if (!accessToken) {
            browserHistory.push('/')
            return;
        }
        axios.post(`/api/me`, { accessToken })
            .then(response => {
                if (response.data.success) {
                    browserHistory.push('/notes')
                    console.log('init', response.data.user)
                    return dispatch(loginAction(response.data.user.name))
                }
                else {
                    localStorage.removeItem('access_token')
                    browserHistory.push('/notes')
                }
            });
    }
}
export function signup(newUser) {
    return dispatch => {
        axios.post(`/api/signup`, newUser)
            .then(response => {
                if (response.data.success) {
                    localStorage.setItem('access_token', response.data.user.token)
                    browserHistory.push('/notes')
                    return dispatch(loginAction(response.data.user.name))
                }
                return dispatch(userError(response.data.error))
            })
            .catch(err => {
                console.error('signup error', err)
            })
    }
}
export function login(user) {
    return dispatch => {
        axios.post(`/api/login`, user)
            .then(response => {
                if (response.data.success) {
                    console.log('login', response.data.user)
                    localStorage.setItem('access_token', response.data.user.token)
                    browserHistory.push('/notes')
                    return dispatch(loginAction(response.data.user.name))
                }
                return dispatch(userError(response.data.error))
            })
            .catch(err => {
                console.error('signup error', err)
            })
    }
}