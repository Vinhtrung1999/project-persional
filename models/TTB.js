const mongoose = require('mongoose')

const Schema = mongoose.Schema


const TTB = new Schema({
    idTTB : String,
    name : String,
    qty: Number,
    priceIn: Number,
    dateIn: String
})

module.exports = mongoose.model('TTB', TTB)