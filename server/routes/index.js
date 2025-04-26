const express = require('express')
const router = express.Router()

const authRoutes = require('./authRoutes')
const dashboardRoutes = require('./dashboardRoutes')
const expensesRoute = require('./expensesRoute')

router.use('/auth', authRoutes)
router.use('/dashboard', dashboardRoutes)
router.use('/expenses', expensesRoute)

module.exports = router