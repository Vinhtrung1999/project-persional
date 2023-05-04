const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
    idStaff: String,
    password: String,
    name: String,
    gender: Number,
    age: Number,
    salary: Number,
    shift: String,
    position: Number
});

module.exports = mongoose.model('staffs', staffSchema);