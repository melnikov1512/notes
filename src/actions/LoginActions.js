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
    browserHistory.push('/login')
    return {
        type: LOG_OUT
    }
}
export function signup(newUser) {
    return dispatch => {
        axios.post(`/api/signup`, newUser)
            .then(response => {
                if (response.data.success) {
                    browserHistory.push('/notes')
                    return dispatch(loginAction(response.data.user))
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
                    browserHistory.push('/notes')
                    return dispatch(loginAction(response.data.user))
                }
                return dispatch(userError(response.data.error))
            })
            .catch(err => {
                console.error('signup error', err)
            })
    }
}