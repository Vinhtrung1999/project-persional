const mongoose = require('mongoose')

const Schema = mongoose.Schema


const staffs = new Schema({
    idStaff : String,
    password : String,
    name : String,
    gender : Number,
    age : Number,
    salary: Number,
    shift: String,
    position: Number
})

module.exports = mongoose.model('staff', staffs)