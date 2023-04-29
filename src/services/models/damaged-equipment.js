const mongoose = require('mongoose');

const damagedEquipmentSchema = new mongoose.Schema({
    idTTB_Br: String,
    idTTB: String,
    name: String,
    qty: Number,
    priceIn: Number,
    dateIn: String
});

module.exports = mongoose.model('damagedEquipment', damagedEquipmentSchema);
