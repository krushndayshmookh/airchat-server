const express = require('express')
const socketIO = require('socket.io')
const http = require('http')

var app = express()
var server = http.createServer(app)
var io = socketIO(server)

/* ---------------------------------------------------- */

var PORT = process.env.PORT || 3000
var DBPORT = process.env.MONGODB_URI || 'mongodb://heroku_1r8j2qpn:vqtghhmnnv1t83qag4j9uqj5oa@ds153824.mlab.com:53824/heroku_1r8j2qpn'
const routes = require('./routes.js')


/* ---------------------------------------------------- */



// ----- Middleware -----

//Import the mongoose module
const mongoose = require('mongoose')

//Set up default mongoose connection
mongoose.connect(DBPORT)

// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise

//Get the default connection
var db = mongoose.connection

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

// -----

const bodyParser = require('body-parser')

//To parse URL encoded data
app.use(bodyParser.urlencoded({
    extended: false
}))

//To parse json data
app.use(bodyParser.json())

// -----

app.set('view engine', 'pug')
app.set('views', './views')

// -----

const cors = require('cors')
app.use(cors())

// -----

// const favicon = require('serve-favicon')
// app.use(favicon('./www/favicon.ico'))

// -----

app.use(express.static('www'))

// -----

app.use('/', routes)

// -----

app.use(function (req, res) {
    res.status(404)

    // respond with html page
    if (req.accepts('html')) {
        res.render('404', {
            url: req.url
        })
        return
    }

    // respond with json
    if (req.accepts('json')) {
        res.send({
            error: 'Not found'
        })
        return
    }

    // default to plain-text. send()
    res.type('txt').send('Not found')
})

/* ---------------------------------------------------- */

app.get('/', (req, res) => {
    res.end('Hi world!')
})


/* ---------------------------------------------------- */

io.on('connection', socket => {
    var addedUser = false;

    // when the client emits 'new message', this listens and executes
    socket.on('new message', (data) => {
        // we tell the client to execute 'new message'
        socket.broadcast.emit('new message', {
            username: socket.username,
            message: data
        });
    });

    // when the client emits 'add user', this listens and executes
    socket.on('add user', (username) => {
        if (addedUser) return;

        // we store the username in the socket session for this client
        socket.username = username;
        ++numUsers;
        addedUser = true;
        socket.emit('login', {
            numUsers: numUsers
        });
        // echo globally (all clients) that a person has connected
        socket.broadcast.emit('user joined', {
            username: socket.username,
            numUsers: numUsers
        });
    });

    // when the client emits 'typing', we broadcast it to others
    socket.on('typing', () => {
        socket.broadcast.emit('typing', {
            username: socket.username
        });
    });

    // when the client emits 'stop typing', we broadcast it to others
    socket.on('stop typing', () => {
        socket.broadcast.emit('stop typing', {
            username: socket.username
        });
    });

    // when the user disconnects.. perform this
    socket.on('disconnect', () => {
        if (addedUser) {
            --numUsers;

            // echo globally that this client has left
            socket.broadcast.emit('user left', {
                username: socket.username,
                numUsers: numUsers
            });
        }
    });
})



/* ---------------------------------------------------- */

server.listen(PORT, err => {
    if (err) {
        throw err
    }
    console.log('Listening on port ' + PORT)
})