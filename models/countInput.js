const mongoose = require('mongoose')

const Schema = mongoose.Schema


const  countInput = new Schema({
    idcount: String,
    idProWH : String,
    name : String,
    qty: Number,
    priceIn: Number,
    sum : Number,
    dateIn: String
})

module.exports = mongoose.model('countInput', countInput)