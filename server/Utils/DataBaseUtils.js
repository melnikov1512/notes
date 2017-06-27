'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setUpConnection = setUpConnection;
exports.listNotes = listNotes;
exports.getNote = getNote;
exports.createNote = createNote;
exports.updateNote = updateNote;
exports.deleteNote = deleteNote;
exports.getUserByEmail = getUserByEmail;
exports.addUser = addUser;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _config = require('../../etc/config.json');

var _config2 = _interopRequireDefault(_config);

require('../models/Note');

require('../models/User');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Note = _mongoose2.default.model('Note');
var User = _mongoose2.default.model('User');

function setUpConnection() {
    _mongoose2.default.connect(_config2.default.db);
    console.log('DB connected');
}

//notes utils
function listNotes() {
    return Note.find();
}
function getNote(id) {
    return Note.findById(id).then(function (note) {
        return note;
    });
}

function createNote(data) {
    var note = new Note(data);

    return note.save();
}

function updateNote(note) {
    Note.updateOne({ _id: note._id }, { title: note.title, text: note.text, color: note.color }, function (err, doc) {
        if (err) {
            console.log(err);
            return err;
        }
    });
    return Note.findById(note._id, function (err, doc) {
        if (err) {
            return err;
        }
        return doc;
    });
}

function deleteNote(id) {
    return Note.findById(id).remove();
}

//users utils
function getUserByEmail(checkingEmail) {
    return User.findOne({ email: checkingEmail }).then(function (data) {
        return data;
    });
}

function addUser(data) {
    var user = new User(data);
    return user.save();
}