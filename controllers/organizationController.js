var Organization = require('../models/organization')

// API -----
exports.organization_detail_get = (req, res) => {
    Organization.findById(req.params.id).populate('suborgs').exec((err, result) => {
        if (err) return res.status(500).send(err)

        if (result) return res.send(result)

        return res.send('No record found for id ' + req.params.id)

    })
}

exports.organizations_get = (req, res) => {
    Organization.find({}, (err, result) => {
        if (err) return res.status(500).send(err)

        if (result) return res.send(result)

        return res.send('No record found.')

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

    Organization.findById(req.body.parent, (err, oldorg) => {
        if (err) return res.status(500).send(err)

        oldorg.suborgs.push(neworg._id)

        Organization.findByIdAndUpdate(oldorg._id, {
            suborgs: oldorg.suborgs
        }, {
            new: true
        }, (err, result) => {
            if (err) return res.status(500).send(err)

            return res.send({
                new: neworg,
                parent: result
            })
        })

    })
}




// Application -----

exports.organization_get = (req, res) => {
    Organization.find({}).populate('suborgs').exec((err, result) => {
        if (err) return res.status(500).send(err)

        if (result) return res.render('app/organization/index', {
            organizations: result
        })

        return res.send('No record found.')

    })
}


exports.organization_create_get = (req, res) => {
    Organization.find({}, (err, result) => {
        if (err) return res.status(500).send(err)

        if (result) res.render('app/organization/create', {
            organizations: result
        })

        return res.send('No record found.')

    })
    //- res.render('organization/create')
}