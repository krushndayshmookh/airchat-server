const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
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
