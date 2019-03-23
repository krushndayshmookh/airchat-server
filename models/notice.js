const mongoose = require('mongoose')
const Schema = mongoose.Schema

const noticeSchema = new Schema({
	from: {
		type: String,
		required: true
	},
	title: {
		type: String,
		required: true
	},
	discription: {
		type: String,
		requied: true
	},
	date: {
		type: Date,
		default: Date.now
	}
})

module.exports = mongoose.model('Notices', noticeSchema)
