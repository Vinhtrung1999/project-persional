const mongoose = require('mongoose');
const { stadiumSchema } = require('./stadium');
const { productSchema } = require('./product');
const billSchema = new mongoose.Schema({
    idBill: String,
    idCus: String,
    idStaff: String,
    listSvd: [stadiumSchema],
    listProducts: [productSchema],
    sum: Number,
    dateUse: String,
    dateOrder: String,
});

module.exports = mongoose.model('bills', billSchema);
