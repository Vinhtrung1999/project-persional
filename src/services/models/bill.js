const mongoose = require('mongoose')

const billSchema = new mongoose.Schema({
    idBill: String,
    idCus: String,
    idStaff: String,
    listSvd: Array,
    listProducts: Array,
    sum: Number,
    dateUse: String,
    dateOrder: String

})

module.exports = mongoose.model('bills', billSchema);
