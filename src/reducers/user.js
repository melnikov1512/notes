import { LOGIN_SUCCESS, ERROR, LOG_OUT } from '../constants/LoginConst'

const initialState = {
    name: null,
    error: null
}

export default function user(state = initialState, action) {

    switch (action.type) {
        case LOGIN_SUCCESS: {
            console.log('login succes', action)
            return {
                name: action.user,
                error: null
            }
        }
        case ERROR: {
            return {
                user: null,
                error: action.error
            }
        }
        case LOG_OUT: {
            return {
                user: null,
                error: null
            }
        }
        default:
            return (state)
    }
}