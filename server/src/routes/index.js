const express = require('express')
const router = express.Router()
const word = require('./word')

router.use('/words', word) 

module.exports = router