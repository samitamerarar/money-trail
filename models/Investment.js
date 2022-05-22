const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InvestmentSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    symbol: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    investmentType: {
        type: String,
        required: false
    },
    priceOfShare: {
        type: Number,
        required: true
    },
    numberOfShares: {
        type: Number,
        required: true
    },
    sector: {
        type: String,
        required: true
    },
    risk: {
        type: String,
        required: true
    },
    comments: {
        type: String,
        required: false
    },
    purchaseDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = Investment = mongoose.model('investment', InvestmentSchema);
