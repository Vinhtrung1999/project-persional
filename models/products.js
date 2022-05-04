const mongoose = require('mongoose')

const Schema = mongoose.Schema


const products = new Schema({
    idPro : String,
    name : String,
    type : Number,
    qty: Number,
    price: Number,
    dateIn: String
})

module.exports = mongoose.model('product', products)