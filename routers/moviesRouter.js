const express = require('express')
const { homePage } = require('../controllers/movieController')

const router = express.Router()

// Định tuyến cho trang chủ
router.get('/', homePage)

module.exports = router
