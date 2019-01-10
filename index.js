const express = require('express')
const socketIO = require('socket.io')
const http = require('http')

/* ---------------------------------------------------- */

var app = express()
var server = http.createServer(app)
var io = socketIO(server)

/* ---------------------------------------------------- */

var PORT = process.env.PORT || 3000

/* ---------------------------------------------------- */

app.get('/', (req, res) => {
    res.end('Hi world!')
})




/* ---------------------------------------------------- */

server.listen(PORT, () => {
    console.log('Listening on port ' + PORT)
})