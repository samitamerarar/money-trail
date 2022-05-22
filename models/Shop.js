const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShopSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
});

module.exports = Shop = mongoose.model('shop', ShopSchema);
