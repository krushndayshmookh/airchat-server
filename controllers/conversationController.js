const Conversation = require('../models/conversation')
const moment = require('moment')

exports.conversation_create_post = (req, res) => {
	let newConversation = new Conversation({
		name: req.body.name,
		creator: req.body.creator
	})

	newConversation.admins.push(req.body.creator)
	newConversation.users.push(req.body.creator)

	newConversation.save().exec(err => {
		if (err) return res.status(500).send(err)

		return res.send(newConversation)
	})
}

exports.conversations_get = (req, res) => {
	Conversation.find({}).exec((err, result) => {
		if (err) return res.status(500).send(err)

		if (result) return res.send(result)

		return res.send(false)
	})
}

exports.conversations_from_user_get = (req, res) => {
	Conversation.find({ from: req.params.from }).exec((err, result) => {
		if (err) return res.status(500).send(err)

		if (result) return res.send(result)

		return res.send(false)
	})
}

exports.conversations_to_user_get = (req, res) => {
	Conversation.find({ to: req.params.to }).exec((err, result) => {
		if (err) return res.status(500).send(err)

		if (result) return res.send(result)

		return res.send(false)
	})
}

exports.conversation_get = (req, res) => {
	Conversation.findById(req.params.id).exec((err, result) => {
		if (err) return res.status(500).send(err)

		if (result) return res.send(result)

		return res.send(false)
	})
}

exports.conversations_delete_all_get = (req, res) => {
	Conversation.deleteMany({}).exec((err, result) => {
		if (err) return res.status(500).send(err)

		if (result) return res.send(result)

		return res.send(false)
	})
}

exports.conversation_delete_post = (req, res) => {
	Conversation.findByIdAndDelete(req.params.id).exec((err, result) => {
		if (err) return res.status(500).send(err)

		if (result) return res.send(result)

		return res.send(false)
	})
}

exports.conversation_join_post = (req, res) => {
	Conversation.findByIdAndUpdate(req.params.id, {
		$push: {
			users: req.body.user
		}
	}).exec((err, result) => {
		if (err) return res.status(500).send(err)

		if (result) return res.send(result)

		return res.send(false)
	})
}
