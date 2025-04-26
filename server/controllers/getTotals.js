const mongoose = require('mongoose')
const Expense = require('../models/expense')

const getTotals = async (req, res) => {
    const userId = new mongoose.Types.ObjectId(req.user.id)
    try {
        const foundTotals = await Expense.aggregate([
            { $match: {userId: userId} },
            { $group: { _id: '$category', amount: {$sum: '$cost'} } }
        ])
        const totalsObj = {}
        foundTotals.forEach((item) => {
            totalsObj[item._id] = item.amount
        })
        res.status(200).json(totalsObj)
    } catch (error) {
        console.log('Error fetching totals', error)
    }
}

module.exports = getTotals