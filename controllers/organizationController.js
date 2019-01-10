var Organization = require('../models/organization')


exports.organization_detail_get = (req, res) => {
    Organization.findById(req.params.id, (err, result) => {
        if (result) {
            res.send(result)
        } else {
            res.send('No record found for id ' + req.params.id)
        }
    })

}

exports.organization_create_post = (req, res) => {
    let neworg = new Organization({
        name: req.body.name,
        location: {
            name: req.body.location
        }
    })

    neworg.save()

    res.send(neworg)
}

exports.organization_create_get = (req, res) => {
    res.render('organization/create')
}