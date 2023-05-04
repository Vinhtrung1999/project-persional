const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    idCus: String,
    password: String,
    name: String,
    gender: Number,
    CMND: Number,
    phone: Number,
    email: String
});

module.exports = mongoose.model('customers', customerSchema);
