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

// -----


var userController = require('../controllers/userController')

// POST request for creating user.
router.post('/user/create', userController.user_create_post)

// GET request for one user.
router.get('/user/:id', userController.user_detail_get)

// GET request for all users.
router.get('/users', userController.users_get)

// -----




//export this router to use in our index.
module.exports = router