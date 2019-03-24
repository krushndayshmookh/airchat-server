const Organization = require('../models/organization')
const User = require('../models/user')

// API -----
exports.organization_get = (req, res) => {
	Organization.findById(req.params.id)
		.populate('suborgs')
		.exec((err, result) => {
			if (err) return res.status(500).send(err)

			if (result) return res.send(result)

			return res.send(false)
		})
}

exports.organization_suborgs_get = (req, res) => {
	Organization.findById(req.params.id)
		.populate('suborgs')
		.exec((err, result) => {
			if (err) return res.status(500).send(err)

			if (result) return res.send(result.suborgs)

			return res.send(false)
		})
}

exports.organizations_get = (req, res) => {
	Organization.find({}).exec((err, result) => {
		if (err) return res.status(500).send(err)

		if (result) return res.send(result)

		return res.send(false)
	})
}

exports.organizations_root_get = (req, res) => {
	Organization.find({ root: true }).exec((err, result) => {
		if (err) return res.status(500).send(err)

		if (result) return res.send(result)

		return res.send(false)
	})
}

exports.organization_create_post = (req, res) => {
	let neworg = new Organization({
		name: req.body.name,
		location: {
			name: req.body.location
		},
		root: req.body.root == 'on' ? true : false
	})

	console.log(req.body)
	console.log(neworg)

	if (neworg.root) {
		neworg.save()
		return res.send(neworg)
	}

	Organization.findById(req.body.parent).exec((err, oldorg) => {
		if (err) return res.status(500).send(err)

		oldorg.suborgs.push(neworg._id)

		Organization.findByIdAndUpdate(oldorg._id, { suborgs: oldorg.suborgs }, { new: true }).exec((err, result) => {
			if (err) return res.status(500).send(err)

			neworg.save()

			return res.send({
				new: neworg,
				parent: result
			})
		})
	})
}

exports.organizations_delete_all_get = (req, res) => {
	Organization.deleteMany({}).exec((err, result) => {
		if (err) return res.status(500).send(err)

		if (result) return res.send(result)

		return res.send(false)
	})
}

exports.organization_delete_post = (req, res) => {
	Organization.findByIdAndDelete(req.params.id).exec((err, result) => {
		if (err) return res.status(500).send(err)

		if (result) return res.send(result)

		return res.send(false)
	})
}

exports.organization_members_get = (req, res) => {
	User.find({ organization: req.params.id }).exec((err, result) => {
		if (err) return res.status(500).send(err)

		if (result) return res.send(result)

		return res.send(false)
	})
}

// Application -----

exports.organization_create_view_get = (req, res) => {
	Organization.find({}).exec((err, result) => {
		if (err) return res.status(500).send(err)

		if (result) return res.render('app/organization/create', { organizations: result })

		return res.send(false)
	})
}
