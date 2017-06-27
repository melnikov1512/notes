import { ADD_NOTE, DEL_NOTE, LOAD_NOTES, UPDATE_NOTE } from '../constants/NoteConst'

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
            let newNotes = [...state.notes]
            let indexOfUpdatingNote = newNotes.findIndex((value) => {
                if (value._id === action.payload._id)
                    return value
                return 0
            })
            newNotes[indexOfUpdatingNote] = action.payload
            return { notes: newNotes }
        }
        case DEL_NOTE: {
            let newNotes = [...state.notes]
            let indexOfDelNote = newNotes.findIndex((value) => {
                if (value._id === action.payload)
                    return value
                return 0
            })
            newNotes.splice(indexOfDelNote, 1)
            return { notes: newNotes }
        }
        case LOAD_NOTES:
            return { notes: action.payload }
        default:
            return state
    }
}