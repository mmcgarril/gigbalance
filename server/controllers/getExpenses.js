const Expense = require('../models/expense')

const getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find({userId: req.user.id}).sort({ date: -1 })
        res.json(expenses)
    } catch (err) {
        console.log('Server error in retreiving expenses', err)
    }
}

module.exports = getExpenses