const mongoose = require('mongoose')
const Schema = mongoose.Schema

const messageSchema = new Schema({
	data: {
		text: {
			type: String
		}
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	time: {
		sent: {
			type: Date
		}
		// ,
		// delivered: {
		//     type: Date
		// },
		// read: {
		//     type: Date
		// }
	}
})

module.exports = mongoose.model('Message', messageSchema)
