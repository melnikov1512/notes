import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { serverPort } from '../etc/config.json'
import * as db from './utils/DataBaseUtils'
import jwt from 'jsonwebtoken'

var key = '25F97zx'
var app = express()
db.setUpConnection()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors({ origin: '*' }))

app.get('/', (req, res) => {
    res.send('Hello API')
})

//notes
app.post('/notes', (req, res) => {
    let token = jwt.verify(req.body.email, key)
    console.log('fetch notes', token)
    return db.getUserByEmail(token.email)
        .then(user => {
            return Promise.all(user.notes.map(curValue => {
                return db.getNote(curValue)
                    .then(note => {
                        return note
                    })
            }))
                .then(notes => {
                    return res.json({
                        success: true,
                        notes
                    })
                })
        })
})

app.post('/new-note', (req, res) => {
    let token = jwt.verify(req.body.email, key)
    return db.createNote(req.body.note)
        .then(note => {
            return db.getUserByEmail(token.email)
                .then(user => {
                    user.notes.push(`${note._id}`)
                    user.save()
                    return res.json({
                        success: true,
                        note
                    })
                })
        })
})

app.post('/notes/update', (req, res) => {
    return db.updateNote(req.body).then(note => {
        res.json({
            success: true,
            note
        })
    })
})

app.post('/notes/del', (req, res) => {
    let token = jwt.verify(req.body.email, key)
    return db.deleteNote(req.body.key)
        .then(id => {
            db.getUserByEmail(token.email)
                .then(user => {
                    console.log('user', user.email)
                    console.log('id', id)
                    let index = user.notes.indexOf(id)
                    user.notes.splice(index, 1)
                    user.save()
                    return res.json({
                        success: true,
                        id
                    })
                })
        })
})

//login&signin 
app.post('/signup', (req, res) => {
    let emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        passwordReg = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}/,
        newUser = req.body

    //validation
    if (!emailReg.test(newUser.email)) {
        return res.json({
            success: false,
            error: {
                type: 'signup',
                message: 'not valid email'
            }
        })
    }
    if (!passwordReg.test(newUser.password)) {
        return res.json({
            success: false,
            error: {
                type: 'signup',
                message: 'not valid password'
            }
        })
    }
    return db.getUserByEmail(newUser.email).then(user => {
        if (user) {
            return res.json({
                success: false,
                error: {
                    type: 'signup',
                    message: 'reserved email'
                }
            })
        }
        return db.addUser(newUser).then(user => {
            return res.json({
                success: true,
                user: {
                    name: user.name,
                    email: jwt.sign({ email: user.email }, key)
                }
            })
        })
    })

})

app.post('/login', (req, res) => {
    return db.getUserByEmail(req.body.email).then(user => {
        if (!user || (req.body.password != user.password)) {
            return res.json({
                success: false,
                error: {
                    type: 'login',
                    message: 'incorrect email or password'
                }
            })
        }
        return res.json({
            success: true,
            user: {
                name: user.name,
                email: jwt.sign({ email: user.email }, key)
            }
        })
    })
})
const server = app.listen(serverPort, function () {
    console.log(`Server is up and running on port ${serverPort}`)
})