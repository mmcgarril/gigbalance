const Expense = require('../models/expense')

const addExpense = async (req, res) => {
    try {
        const expense = new Expense({
            userId: req.user.id,
            date: req.body.date,
            payMethod: req.body.payMethod,
            cost: req.body.cost,
            category: req.body.category,
            company: req.body.company,
            description: req.body.description
        })

        const savedExpense = await expense.save()

        if(!savedExpense) {
            res.status(400).json('Error saving expense')
        } else {
            res.status(200).json({savedExpense})
        }
        
    } catch (err) {
        console.log('Server error', err)
    }
}

module.exports = addExpense