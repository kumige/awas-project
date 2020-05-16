var express = require('express');
var router = express.Router();
const path = require('path')
const login = require('./userRoutes/login')
const notes = require('./noteRoutes/notes')

//backend
router.use('/login', login)
router.use('/notes', notes)

//frontend
router.get('/', (req, res) => {
    res.sendFile(path.resolve('public/index.html'))
})


module.exports = router;