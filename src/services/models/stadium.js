const mongoose = require('mongoose');

const stadiumSchema = new mongoose.Schema({
    idSvd: String,
    name: String,
    status: Number,
    capacity: Number,
    type: Number,
    image: String,
    image_detail_1: String,
    image_detail_2: String,
    price: Number
});

module.exports = mongoose.model('stadiums', stadiumSchema);
module.exports = {
    stadiumSchema,
};
