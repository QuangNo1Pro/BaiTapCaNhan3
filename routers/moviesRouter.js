const express = require('express')
const { homePage } = require('../controllers/movieController')

const router = express.Router()
router.get('/', homePage)

module.exports = router
