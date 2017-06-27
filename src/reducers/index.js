import { combineReducers } from 'redux'
import notes from './notes.js'
import user from './user.js'

export default combineReducers({
    notes,
    user
})