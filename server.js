'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _config = require('./etc/config.json');

var _DataBaseUtils = require('./server/utils/DataBaseUtils');

var db = _interopRequireWildcard(_DataBaseUtils);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var port = process.env.PORT || _config.serverPort;
var key = '25F97zx';
var app = (0, _express2.default)();
db.setUpConnection();

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use((0, _cors2.default)({ origin: '*' }));

app.use(_express2.default.static(_path2.default.resolve(__dirname, './build'))

//notes
);app.post('/api/notes', function (req, res) {
    var token = _jsonwebtoken2.default.verify(req.body.email, key);
    console.log('fetch notes', token);
    return db.getUserByEmail(token.email).then(function (user) {
        return Promise.all(user.notes.map(function (curValue) {
            return db.getNote(curValue).then(function (note) {
                return note;
            });
        })).then(function (notes) {
            return res.json({
                success: true,
                notes: notes
            });
        });
    });
});

app.post('/api/new-note', function (req, res) {
    var token = _jsonwebtoken2.default.verify(req.body.email, key);
    return db.createNote(req.body.note).then(function (note) {
        return db.getUserByEmail(token.email).then(function (user) {
            user.notes.push('' + note._id);
            user.save();
            return res.json({
                success: true,
                note: note
            });
        });
    });
});

app.post('/api/notes/update', function (req, res) {
    return db.updateNote(req.body).then(function (note) {
        res.json({
            success: true,
            note: note
        });
    });
});

app.post('/api/notes/del', function (req, res) {
    var token = _jsonwebtoken2.default.verify(req.body.email, key);
    return db.deleteNote(req.body.key).then(function (id) {
        db.getUserByEmail(token.email).then(function (user) {
            console.log('user', user.email);
            console.log('id', id);
            var index = user.notes.indexOf(id);
            user.notes.splice(index, 1);
            user.save();
            return res.json({
                success: true,
                id: id
            });
        });
    });
}

//login&signin 
);app.post('/api/signup', function (req, res) {
    var emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        passwordReg = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}/,
        newUser = req.body;

    //validation
    if (!emailReg.test(newUser.email)) {
        return res.json({
            success: false,
            error: {
                type: 'signup',
                message: 'not valid email'
            }
        });
    }
    if (!passwordReg.test(newUser.password)) {
        return res.json({
            success: false,
            error: {
                type: 'signup',
                message: 'not valid password'
            }
        });
    }
    return db.getUserByEmail(newUser.email).then(function (user) {
        if (user) {
            return res.json({
                success: false,
                error: {
                    type: 'signup',
                    message: 'reserved email'
                }
            });
        }
        return db.addUser(newUser).then(function (user) {
            return res.json({
                success: true,
                user: {
                    name: user.name,
                    email: _jsonwebtoken2.default.sign({ email: user.email }, key)
                }
            });
        });
    });
});

app.post('/api/login', function (req, res) {
    return db.getUserByEmail(req.body.email).then(function (user) {
        if (!user || req.body.password != user.password) {
            return res.json({
                success: false,
                error: {
                    type: 'login',
                    message: 'incorrect email or password'
                }
            });
        }
        return res.json({
            success: true,
            user: {
                name: user.name,
                email: _jsonwebtoken2.default.sign({ email: user.email }, key)
            }
        });
    });
});

app.get('*', function (req, res) {
    console.log('index.html', req.path);
    res.sendFile(_path2.default.resolve(__dirname, './build/index.html'));
});

app.listen(port, function () {
    console.log('Server is up and running on port ' + port);
});

console.log('dirname', __dirname);
console.log('resolve', _path2.default.resolve(__dirname, './build/index.html'));