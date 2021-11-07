const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    products: [
        {
            product_id: String,
        },
    ],
    user: String,
    total_price: Number,
    created_at: {
        type: Date,
        default: Date.now(),
    }
})

const order = new mongoose.model('order', schema);

module.exports = order;