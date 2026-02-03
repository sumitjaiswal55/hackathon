const mongoose = require('mongoose');


const ExpenseSchema = new mongoose.Schema({
    propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property' },
    description: String,
    totalAmount: Number,
    paidBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    splitAmong: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        share: Number,
        isPaid: { type: Boolean, default: false }
    }],
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ExpenseSchema', ExpenseSchemama);
