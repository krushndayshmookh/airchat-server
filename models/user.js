var mongoose = require('mongoose')
var Schema = mongoose.Schema

var userSchema = new Schema({
	name: {
		type: String
	},
	username: {
		type: String
	},
	password: {
		type: String
	},
	position: {
		type: String
	},
	organization: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Organization'
	}
})

module.exports = mongoose.model('User', userSchema)
