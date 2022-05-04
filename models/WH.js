const mongoose = require('mongoose')

const Schema = mongoose.Schema


const WH = new Schema({
    idProWH : String,
    name : String,
    type : Number,
    qty: Number,
    priceIn: Number,
    price: Number,
    dateIn: String
})

module.exports = mongoose.model('WH', WH)