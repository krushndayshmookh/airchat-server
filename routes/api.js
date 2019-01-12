const express = require('express')
var router = express.Router()


// Home page -----

router.get('/', (req, res) => {
    res.render('api/index')
})

// -----

// Data Routes -----

// Require controller modules.
var organizationController = require('../controllers/organizationController')


// POST request for creating organization.
router.post('/organization/create', organizationController.organization_create_post)

// GET request for one organization.
router.get('/organization/:id', organizationController.organization_detail_get)

// GET request for all organizations.
router.get('/organizations', organizationController.organizations_get)


//export this router to use in our index.
module.exports = router