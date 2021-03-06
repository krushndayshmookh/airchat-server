const Message = require('../models/message')
const Conversation = require('../models/conversation')
const moment = require('moment')

// CREATE MESSAGE
exports.message_create_post = (req, res) => {
	let newMessage = new Message({
		user: req.body.user,
		data: {
			text: req.body.text
		},
		time: {
			sent: new moment()
		}
	})

	newMessage.save(err => {
		if (err) return res.status(500).send(err)

		Conversation.findByIdAndUpdate(req.body.conversation, {
			$push: {
				messages: newMessage
			}
		}).exec((err, result) => {
			if (err) return res.status(500).send(err)

			if (result) return res.send(newMessage)

			return res.send(false)
		})
	})
}

// GET ALL MESSAGES
exports.messages_get = (req, res) => {
	Message.find({}).exec((err, result) => {
		if (err) return res.status(500).send(err)

		if (result) return res.send(result)

		return res.send(false)
	})
}

// GET MESSAGES BY ID
exports.message_get = (req, res) => {
	Message.findById(req.params.id).exec((err, result) => {
		if (err) return res.status(500).send(err)

		if (result) return res.send(result)

		return res.send(false)
	})
}

// DELETE ALL MESSAGES
exports.messages_delete_all_get = (req, res) => {
	Message.deleteMany({}).exec((err, result) => {
		if (err) return res.status(500).send(err)

		if (result) return res.send(result)

		return res.send(false)
	})
}

// DELETE MESSAGE BY ID
exports.message_delete_post = (req, res) => {
	Message.findByIdAndDelete(req.params.id).exec((err, result) => {
		if (err) return res.status(500).send(err)

		if (result) return res.send(result)

		return res.send(false)
	})
}
