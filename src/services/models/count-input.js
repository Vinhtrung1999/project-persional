const mongoose = require('mongoose');

const countInputSchema = new mongoose.Schema({
    idcount: String,
    idProWH: String,
    name: String,
    qty: Number,
    priceIn: Number,
    sum: Number,
    dateIn: String
});

module.exports = mongoose.model('countInput', countInputSchema);
