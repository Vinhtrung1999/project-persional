const mongoose = require('mongoose')

const Schema = mongoose.Schema


const svds = new Schema({
    idSvd : String,
    name : String,
    status : Number,
    capacity : Number,
    type : Number,
    price: Number
})

module.exports = mongoose.model('svd', svds)