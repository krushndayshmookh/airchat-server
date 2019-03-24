const mongoose = require('mongoose')
const Schema = mongoose.Schema

const conversationSchema = new Schema({
	name: {
		type: String
	},
	admins: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		}
	],
	users: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		}
	],
	messages: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Message'
		}
	]
})

module.exports = mongoose.model('Conversation', conversationSchema)
