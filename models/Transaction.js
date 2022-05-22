const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    id: {
        type: String,
        required: false
    },
    merchant: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: false
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    }
});

module.exports = Transaction = mongoose.model('transaction', TransactionSchema);
