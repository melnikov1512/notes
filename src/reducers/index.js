import { combineReducers } from 'redux'
import notes from './notes.js'
import user from './user.js'
import search from './search'

export default combineReducers({
    notes,
    user,
    search
})