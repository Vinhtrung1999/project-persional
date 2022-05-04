const mongoose = require('mongoose')

const Schema = mongoose.Schema


const  bills = new Schema({
    idBill : String,
    idCus: String,
    idStaff: String,
    listSvd: Array,
    listProducts: Array,
    sum: Number,
    dateUse: String,
    dateOrder: String
    
})

module.exports = mongoose.model('bill', bills)