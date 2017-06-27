import { ADD_NOTE, DEL_NOTE, LOAD_NOTES, UPDATE_NOTE } from '../constants/NoteConst'
import axios from 'axios'

function addNote(note) {
    return ({
        type: ADD_NOTE,
        payload: note
    })
}

function deleteNote(key) {
    return ({
        type: DEL_NOTE,
        payload: key
    })
}

function loadNotes(notes) {
    return ({
        type: LOAD_NOTES,
        payload: notes
    })
}

function updateNotesStore(note) {
    return ({
        type: UPDATE_NOTE,
        payload: note
    })
}

export function fetchNotes(email) {
    console.log('fetch notes', email)
    return ((dispatch) => {
        axios.post(`/notes`, email)
            .then((response) => {
                if (response.data.success) {
                    return dispatch(loadNotes(response.data.notes))
                }
                return dispatch(loadNotes([]))
            })
            .catch(err => console.error('load notes error', err))
    })
}

export function createNote(data) {
    return dispatch => {
        axios.post(`/new-note`, data)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.note)
                    return (dispatch(addNote(response.data.note)))
                } else {
                    console.log('create note error')
                }
            })
            .catch(err => {
                console.error('create note error:', err)
            })
    }
}

export function updateNote(data) {
    return dispatch => {
        axios.post(`/notes/update`, data)
            .then(response => {
                if (response.data.success) {
                    return (dispatch(updateNotesStore(response.data.note)))
                } else {
                    console.log('update note error')
                }

            })
            .catch(err => {
                console.error('update note error:', err)
            })
    }
}

export function delNote(key, email) {
    return dispatch => {
        axios.post(`/notes/del`, { key, email })
            .then(response => {
                if (response.data.success) {
                    dispatch(deleteNote(response.data.id))
                } else {
                    console.log('delete note error')
                }

            })
            .catch(err => {
                console.error('delete note error:', err)
            })
    }
}