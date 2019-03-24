const express = require('express')
var router = express.Router()


// Home page -----

router.get('/models', (req, res) => {
    res.render('api/docs/models')
})

router.get('/routes', (req, res) => {
    res.render('api/docs/routes')
})

// -----


//export this router to use in our index.
module.exports = router