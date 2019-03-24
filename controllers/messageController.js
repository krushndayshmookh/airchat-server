const Message = require('../models/message')
const moment = require('moment')

exports.message_create_post = (req, res) => {
	let newMessage = new Message({
		from: req.body.from,
		to: req.body.title,
		data: {
			text: req.body.text
		},
		time: {
			sent: new moment()
		}
	})

	newMessage.save().exec(err => {
		if (err) return res.status(500).send(err)

		return res.send(newMessage)
	})
}

exports.messages_get = (req, res) => {
	Message.find({}).exec((err, result) => {
		if (err) return res.status(500).send(err)

		if (result) return res.send(result)

		return res.send(false)
	})
}

exports.messages_from_user_get = (req, res) => {
	Message.find({ from: req.params.from }).exec((err, result) => {
		if (err) return res.status(500).send(err)

		if (result) return res.send(result)

		return res.send(false)
	})
}

exports.messages_to_user_get = (req, res) => {
	Message.find({ to: req.params.to }).exec((err, result) => {
		if (err) return res.status(500).send(err)

		if (result) return res.send(result)

		return res.send(false)
	})
}

exports.message_get = (req, res) => {
	Message.findById(req.params.id).exec((err, result) => {
		if (err) return res.status(500).send(err)

		if (result) return res.send(result)

		return res.send(false)
	})
}

exports.messages_delete_all_get = (req, res) => {
	Message.remove({}).exec((err, result) => {
		if (err) return res.status(500).send(err)

		if (result) return res.send(result)

		return res.send(false)
	})
}

exports.message_delete_post = (req, res) => {
	Message.findByIdAndRemove(req.params.id).exec((err, result) => {
		if (err) return res.status(500).send(err)

		if (result) return res.send(result)

		return res.send(false)
	})
}
