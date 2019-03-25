const Organization = require('../models/organization')
const User = require('../models/user')

// API -----
// GET ORGANISATIONS BY ID
exports.organization_get = (req, res) => {
	Organization.findById(req.params.id)
		.populate('suborgs')
		.exec((err, result) => {
			if (err) return res.status(500).send(err)

			if (result) return res.send(result)

			return res.send(false)
		})
}

// GET ORGANISATIONS' SUBORGANISATION BY ID
exports.organization_suborgs_get = (req, res) => {
	Organization.findById(req.params.id)
		.populate('suborgs')
		.exec((err, result) => {
			if (err) return res.status(500).send(err)

			if (result) return res.send(result.suborgs)

			return res.send(false)
		})
}

// GET ALL ORGANISATIONS 
exports.organizations_get = (req, res) => {
	Organization.find({}).exec((err, result) => {
		if (err) return res.status(500).send(err)

		if (result) return res.send(result)

		return res.send(false)
	})
}

// GET CONVERSATIONS BY ROOT
exports.organizations_root_get = (req, res) => {
	Organization.find({ root: true }).exec((err, result) => {
		if (err) return res.status(500).send(err)

		if (result) return res.send(result)

		return res.send(false)
	})
}

// CREATE POST
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

// DELETE ALL ORGANISATIONS
exports.organizations_delete_all_get = (req, res) => {
	Organization.deleteMany({}).exec((err, result) => {
		if (err) return res.status(500).send(err)

		if (result) return res.send(result)

		return res.send(false)
	})
}
// DELETE POST 
exports.organization_delete_post = (req, res) => {
	Organization.findByIdAndDelete(req.params.id).exec((err, result) => {
		if (err) return res.status(500).send(err)

		if (result) return res.send(result)

		return res.send(false)
	})
}
// GET ALL MEMBERS
exports.organization_members_get = (req, res) => {
	User.find({ organization: req.params.id }).exec((err, result) => {
		if (err) return res.status(500).send(err)

		if (result) return res.send(result)

		return res.send(false)
	})
}

// Application -----

// VIEW CREATED ORGANISATION
exports.organization_create_view_get = (req, res) => {
	Organization.find({}).exec((err, result) => {
		if (err) return res.status(500).send(err)

		if (result) return res.render('app/organization/create', { organizations: result })

		return res.send(false)
	})
}
