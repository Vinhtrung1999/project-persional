const mongoose = require('mongoose')

const Schema = mongoose.Schema


const customers = new Schema({
    idCus : String,
    password : String,
    name : String,
    gender : Number,
    CMND: Number,
    phone: Number,
    email: String
})

module.exports = mongoose.model('customer', customers)