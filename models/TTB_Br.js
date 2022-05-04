const mongoose = require('mongoose')

const Schema = mongoose.Schema


const TTB_BR = new Schema({
    idTTB_Br : String,
    idTTB : String,
    name : String,
    qty: Number,
    priceIn: Number,
    dateIn: String
})

module.exports = mongoose.model('TTB_BR', TTB_BR)