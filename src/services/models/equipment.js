const mongoose = require('mongoose');

const equipmentSchema = new mongoose.Schema({
    idTTB: String,
    name: String,
    qty: Number,
    priceIn: Number,
    dateIn: String
});

module.exports = mongoose.model('equipment', equipmentSchema);