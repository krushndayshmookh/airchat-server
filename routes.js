const express = require('express')
var router = express.Router()


// User side pages -----

router.get('/', (req, res) => {
    res.render('index')
})

router.get('/about', (req, res) => {
    res.render('about')
})

// -----

// Admin routes -----

router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', (req, res) => {
    //- console.log(req.body)
    if (req.body.username == 'krushn' && req.body.password == 'dayshmookh') {
        res.send(true)
    } else {
        res.send(false)
    }

})

// -----

// Data Routes -----

// Require controller modules.
var organizationController = require('./controllers/organizationController')





// GET request for creating organization form.
router.get('/organization/create', organizationController.organization_create_get)
// POST request for creating organization.
router.post('/organization/create', organizationController.organization_create_post)

// GET request for one organization.
router.get('/organization/:id', organizationController.organization_detail_get)
// GET request for all organizations dashboard.
router.get('/organization', organizationController.organization_get)
// GET request for all organizations.
router.get('/organizations', organizationController.organizations_get)


//export this router to use in our index.
module.exports = router