const express = require('express')
const router = express.Router()
const authorize = require('../middleware/authMiddleware')
const getDashboard = require('../controllers/getDashboard')

router.get('/', authorize, getDashboard)

module.exports = router