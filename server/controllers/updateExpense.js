const Expense = require('../models/expense')

const updateExpense = async (req, res) => {
    const { id } = req.params
    try {
        const expense = await Expense.findByIdAndUpdate(id, req.body)
        if (!expense) {
            res.status(404).json({message: 'expense not found'})
            return
        }
        res.status(200).json({updateExpense})
    } catch (error) {
        console.log('Error updating expense', error)
    }
}

module.exports = updateExpense