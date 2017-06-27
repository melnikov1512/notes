import mongoose from "mongoose"
import config from '../../etc/config.json'
import '../models/Note'
import '../models/User'

const Note = mongoose.model('Note')
const User = mongoose.model('User')

export function setUpConnection() {
    mongoose.connect(config.db);
    console.log('DB connected')
}


//notes utils
export function listNotes() {
    return Note.find()
}
export function getNote(id) {
    return Note.findById(id).then(note => {
        return note
    })
}

export function createNote(data) {
    const note = new Note(data);

    return note.save()
}

export function updateNote(note) {
    Note.updateOne({ _id: note._id },
        { title: note.title, text: note.text, color: note.color },
        (err, doc) => {
            if (err) {
                console.log(err)
                return (err)
            }
        })
    return Note.findById(note._id, (err, doc) => {
        if (err) {
            return err
        }
        return doc
    })
}

export function deleteNote(id) {
    return Note.findById(id).remove()
}

//users utils
export function getUserByEmail(checkingEmail) {
    return User.findOne({ email: checkingEmail }).then(data => {
        return data
    })
}

export function addUser(data) {
    const user = new User(data)
    return user.save()
}