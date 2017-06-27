import { LOGIN_SUCCESS, ERROR, LOG_OUT } from '../constants/LoginConst'

const initialState = {
    user: null,
    error: null
}

export default function user(state = initialState, action) {

    switch (action.type) {
        case LOGIN_SUCCESS: {
            return {
                user: action.user,
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
                user: { name: '', email: '' },
                error: null
            }
        }
        default:
            return (state)
    }
}