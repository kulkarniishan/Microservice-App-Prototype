const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    created_at: {
        type: Date,
        default: Date.now(),
    },
})

const product = new mongoose.model('order', schema);

module.exports = order;