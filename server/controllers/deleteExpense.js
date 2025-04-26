const Expense = require('../models/expense')

const deleteExpense = async (req, res) => {
    const { id } = req.params
    
    try {
        const deletedExpense = await Expense.deleteOne({_id: id})

        if (!deletedExpense) {
            res.status(404).json({message: 'expense not found'})
            return
        }

        res.status(200).json({message: 'Expense deleted successfully'})

    } catch (error) {
        console.log('Error deleting expense', error)
    }
}

module.exports = deleteExpense