const express = require('express')
const Router = express.Router()

const ctlCustomer = require('../controller/customer')
//[GET]
Router.get('/login', ctlCustomer.login)

Router.get('/destroySsCus', ctlCustomer.destroySS)
//[POST]

module.exports = Router