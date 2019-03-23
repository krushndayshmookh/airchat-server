const Notice = require('../models/notices')

exports.notices_create_post = (req, res) => {
	let newnot = new Notice({
		from: req.body.from,
		title: req.body.title,
		discription: req.body.discription
	})
	newnot.save(err => {
		if (err) return res.status(500).send(err)
		return res.send(newnot)
	})
	// console.log(req.body);
	// console.log(newnot);
}

exports.notices_all_get = (req, res) => {
	Notice.find({}, (err, result) => {
		if (err) return res.status(500).send(err)

		if (result)
			return res.render('app/notices/index', {
				notices: result
			})
	})
}

exports.notices_delete_all_get = (req, res) => {
	Notice.remove({}, (err, result) => {
		if (err) return res.status(500).send(err)

		if (result) return res.send(result)

		return res.send(false)
	})
}

exports.notices_delete_post = (req, res) => {
	Notice.findByIdAndRemove(req.params.id, (err, result) => {
		if (err) return res.status(500).send(err)

		if (result) return res.send(result)

		return res.send(false)
	})
}
