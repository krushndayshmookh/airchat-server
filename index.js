const express = require('express')
const socketIO = require('socket.io')
const http = require('http')

var app = express()
var server = http.createServer(app)
var io = socketIO(server)

/* ---------------------------------------------------- */

var PORT = process.env.PORT || 3000
var DBPORT = process.env.MONGODB_URI 
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
    console.log('Socket connected')
})



/* ---------------------------------------------------- */

server.listen(PORT, err => {
    if (err) {
        throw err
    }
    console.log('Listening on port ' + PORT)
})