import { ADD_NOTE, DEL_NOTE, LOAD_NOTES, UPDATE_NOTE, CLEAR_STORE } from '../constants/NoteConst'

const initialState = {
    notes: []
}

export default function notes(state = initialState, action) {

    switch (action.type) {
        case ADD_NOTE:
            return {
                notes: [...state.notes, {
                    _id: action.payload._id,
                    title: action.payload.title,
                    text: action.payload.text,
                    color: action.payload.color
                }]
            }
        case UPDATE_NOTE: {
            console.log('update note', action.payload)
            let newNotes = [...state.notes]
            let indexOfUpdatingNote = newNotes.findIndex((value) => value._id === action.payload._id)
            newNotes[indexOfUpdatingNote] = action.payload
            return { notes: newNotes }
        }
        case DEL_NOTE: {
            let newNotes = state.notes.filter(value => value._id !== action.payload)
            return { notes: newNotes }
        }
        case LOAD_NOTES:
            return { notes: action.payload }
        case CLEAR_STORE:
            return { notes: [] }
        default:
            return state
    }
}