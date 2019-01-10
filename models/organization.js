var mongoose = require('mongoose')
var Schema = mongoose.Schema

var organizationSchema = new Schema({
    name: {
        type: String
    },
    location: {
        name: {
            type: String
        },
        geo: {
            lat: {
                type: Number
            },
            long: {
                type: Number
            }
        }
    },
    suborgs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization'
    }]
})

module.exports = mongoose.model('Organization', organizationSchema)