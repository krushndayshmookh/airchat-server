const express = require('express')
const router = express.Router()

// Home page -----

router.get('/', (req, res) => res.render('api/index'))
router.get('/docs', (req, res) => res.render('api/docs/index'))

// -----

// Data Routes -----

// Require controller modules.
const organizationController = require('../controllers/organizationController')

// POST request for creating organization.
router.post('/organization/create', organizationController.organization_create_post)

// GET request for one organization.
router.get('/organization/:id', organizationController.organization_get)

// POST request for one organization.
router.post('/organization/:id/delete', organizationController.organization_delete_post)

// GET request for all organizations.
router.get('/organizations', organizationController.organizations_get)

// GET request for all root organizations.
router.get('/organizations/root', organizationController.organizations_root_get)

// GET request for delete all organizations.
router.get('/organizations/delete/all', organizationController.organizations_delete_all_get)

// GET request for organization members.
router.get('/organization/:id/members', organizationController.organization_members_get)
// -----

const userController = require('../controllers/userController')

// POST request for creating user.
router.post('/user/create', userController.user_create_post)

// GET request for one user.
router.get('/user/:id', userController.user_get)

// GET request for all users.
router.get('/users', userController.users_get)

router.get('/users/delete/all', userController.users_delete_all_get)

router.post('/user/:id/delete', userController.user_delete_post)

// -----

const noticeController = require('../controllers/noticeController')

router.post('/notice/create', noticeController.notice_create_post)

router.get('/notice/:id', noticeController.notice_get)

router.get('/notices', noticeController.notices_get)

router.get('/notices/delete/all', noticeController.notices_delete_all_get)

router.post('/notice/:id/delete', noticeController.notice_delete_post)

// -----

const conversationController = require('../controllers/conversationController')

router.post('/conversation/create', conversationController.conversation_create_post)

router.get('/conversation/:id', conversationController.conversation_get)

router.get('/conversations', conversationController.conversations_get)

router.get('/conversations/delete/all', conversationController.conversations_delete_all_get)

router.post('/conversation/:id/delete', conversationController.conversation_delete_post)

router.post('/conversation/:id/join', conversationController.conversation_join_post)

// -----

const messageController = require('../controllers/messageController')

router.post('/message/create', messageController.message_create_post)

router.get('/message/:id', messageController.message_get)

router.get('/messages', messageController.messages_get)

router.get('/messages/delete/all', messageController.messages_delete_all_get)

router.post('/message/:id/delete', messageController.message_delete_post)

// -----

//export this router to use in our index.
module.exports = router
