const mongoose = require('mongoose')
require('dotenv').config()
function connect(){
    mongoose.connect(process.env.URI_MONGO, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}

module.exports = {connect}