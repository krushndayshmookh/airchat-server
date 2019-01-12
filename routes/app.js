const express = require('express')
var router = express.Router()


// User side pages -----

router.get('/', (req, res) => {
    res.render('app/index')
})

// -----

// Data Routes -----

// Require controller modules.
var organizationController = require('../controllers/organizationController')





// GET request for creating organization form.
router.get('/organization/create', organizationController.organization_create_get)
// GET request for all organizations dashboard.
router.get('/organization', organizationController.organization_get)


//export this router to use in our index.
module.exports = router