const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    idPro: String,
    name: String,
    type: Number,
    qty: Number,
    price: Number,
    dateIn: String,
});

module.exports = mongoose.model('products', productSchema);