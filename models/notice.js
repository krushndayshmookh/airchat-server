const mongoose = require('mongoose')
const Schema = mongoose.Schema

const noticeSchema = new Schema({
	from: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	title: {
		type: String
	},
	body: {
		type: String
	},
	date: {
		type: Date
	}
})

module.exports = mongoose.model('Notice', noticeSchema)
