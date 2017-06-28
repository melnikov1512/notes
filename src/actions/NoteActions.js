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

export function fetchNotes() {
    const accessToken = localStorage.getItem('access_token')
    return ((dispatch) => {
        axios.post(`/api/notes`, { accessToken })
            .then((response) => {
                if (response.data.success) {
                    console.log('fetch notes', response.data.notes)
                    return dispatch(loadNotes(response.data.notes))
                }
                return dispatch(loadNotes([]))
            })
            .catch(err => console.error('load notes error', err))
    })
}

export function createNote(note) {
    console.log('create note', note)
    const accessToken = localStorage.getItem('access_token')
    return dispatch => {
        axios.post(`/api/new-note`, { note, accessToken })
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
    console.log('update note', data)
    return dispatch => {
        axios.post(`/api/notes/update`, data)
            .then(response => {
                if (response.data.success) {
                    return (dispatch(updateNotesStore(data)))
                } else {
                    console.log('update note error')
                }

            })
            .catch(err => {
                console.error('update note error:', err)
            })
    }
}

export function delNote(_id) {
    console.log('delete note', _id)
    const accessToken = localStorage.getItem('access_token')
    return dispatch => {
        axios.post(`/api/notes/del`, { _id, accessToken })
            .then(response => {
                if (response.data.success) {
                    dispatch(deleteNote(_id))
                } else {
                    console.log('delete note error')
                }

            })
            .catch(err => {
                console.error('delete note error:', err)
            })
    }
}