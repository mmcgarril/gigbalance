const mongoose = require('mongoose')

const ExpenseSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, require: true},
    date: {type: Date, require: true},
    payMethod: String,
    cost: {type: Number, require: true},
    category: String,
    company: {type: String, require: true, minlength: 1},
    description: {type: String, require: true, minlength: 1},
})

module.exports = mongoose.model('Expense', ExpenseSchema)