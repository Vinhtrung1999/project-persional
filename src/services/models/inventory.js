const mongoose = require('mongoose')

const inventorySchema = new mongoose.Schema({
    idProWH: String,
    name: String,
    type: Number,
    qty: Number,
    priceIn: Number,
    price: Number,
    dateIn: String
});

module.exports = mongoose.model('inventory', inventorySchema)