var User = require('../models/user')
var Organization = require('../models/organization')

// API -----
exports.user_detail_get = (req, res) => {
    User.findById(req.params.id).populate('organization').exec((err, result) => {
        if (err) return res.status(500).send(err)

        if (result) return res.send(result)

        return res.send('No record found for id ' + req.params.id)

    })
}

exports.users_get = (req, res) => {
    User.find({}, (err, result) => {
        if (err) return res.status(500).send(err)

        if (result) return res.send(result)

        return res.send('No record found.')

    })
}

exports.user_create_post = (req, res) => {
    let newuser = new User({
        name: req.body.name,
        phone: req.body.phone,
        username: req.body.username,
        password: req.body.password,
        position: req.body.position,
        organization: req.body.organization
    })
    newuser.save(err=>{
        if (err) return res.status(500).send(err)
        return res.send(newuser)
    })
}




// Application -----

exports.user_get = (req, res) => {
    User.find({}).populate('organization').exec((err, result) => {
        if (err) return res.status(500).send(err)

        if (result) return res.render('app/user/index', {
            users: result
        })

        return res.send('No record found.')

    })
}


exports.user_create_get = (req, res) => {
    Organization.find({}, (err, result) => {
        if (err) return res.status(500).send(err)

        if (result) return res.render('app/user/create', {
            organizations: result
        })

        return res.send('No record found.')

    })
    //- res.render('user/create')
}