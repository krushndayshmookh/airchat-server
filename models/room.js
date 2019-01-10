var mongoose = require('mongoose')
var Schema = mongoose.Schema

var roomSchema = new Schema({
    name: {
        type: String
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }]
})

module.exports = mongoose.model('Room', roomSchema)