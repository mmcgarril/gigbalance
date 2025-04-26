const express = require('express')
const router = express.Router()
const authorize = require('../middleware/authMiddleware')
const getExpenses = require('../controllers/getExpenses')
const addExpense = require('../controllers/addExpense')
const updateExpense = require('../controllers/updateExpense')
const deleteExpense = require('../controllers/deleteExpense')
const getTotals = require('../controllers/getTotals')

router.get('/', authorize, getExpenses)
router.post('/', authorize, addExpense)
router.put('/:id', authorize, updateExpense)
router.delete('/:id', authorize, deleteExpense)
router.get('/totals/:id', authorize, getTotals)

module.exports = router