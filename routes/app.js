const express = require('express')
const router = express.Router()

// User side pages -----

router.get('/', (req, res) => res.render('app/index'))

router.get('/settings', (req, res) => res.render('app/settings'))

router.get('/organization/manage', (req, res) => res.render('app/organization/manage'))

router.get('/organization/profile', (req, res) => res.render('app/organization/profile'))
// -----

// Data Routes -----

// Require controller modules.
const organizationController = require('../controllers/organizationController')

// GET request for creating organization form.
router.get('/organization/create', organizationController.organization_create_view_get)
// GET request for all organizations dashboard.
router.get('/organizations', organizationController.organizations_view_get)

// -----

const userController = require('../controllers/userController')

// GET request for creating user form.
router.get('/user/create', userController.user_create_view_get)
// GET request for all users dashboard.
router.get('/user', userController.users_view_get)

router.get('/user/chats', (req, res) => res.render('app/chat/list'))

router.get('/user/chat', (req, res) => res.render('app/chat/chat'))

router.get('/user/profile', (req, res) => res.render('app/user/profile'))
//Auth routes
router.get('/login', (req, res) => res.render('app/auth/login_user'))

router.get('/signup', (req, res) => res.render('app/auth/signup'))

const noticeController = require('../controllers/noticeController')

router.get('/notices/create', (req, res) => res.render('app/notices/create'))

router.get('/notices', noticeController.notices_view_get)

// -----

//export this router to use in our index.
module.exports = router
