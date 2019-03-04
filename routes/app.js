const express = require('express')
var router = express.Router()

// User side pages -----

router.get('/', (req, res) => {
	res.render('app/index')
})
router.get('/settings', (req, res) => {
	res.render('app/settings')
})
router.get('/organization/manage', (req, res) => {
	res.render('app/organization/manage')
})

router.get('/organization/profile', (req, res) => {
	res.render('app/organization/profile')
})
// -----

// Data Routes -----

// Require controller modules.
var organizationController = require('../controllers/organizationController')

// GET request for creating organization form.
router.get(
	'/organization/create',
	organizationController.organization_create_get
)
// GET request for all organizations dashboard.
router.get('/organization', organizationController.organization_get)

// -----

var userController = require('../controllers/userController')

// GET request for creating user form.
router.get('/user/create', userController.user_create_get)
// GET request for all users dashboard.
router.get('/user', userController.user_get)

router.get('/user/chats', (req, res) => {
	res.render('app/chat/list')
})

router.get('/user/chat', (req, res) => {
	res.render('app/chat/chat')
})

router.get('/user/profile', (req, res) => {
	res.render('app/user/profile')
})

// -----

//export this router to use in our index.
module.exports = router
