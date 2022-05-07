const express = require('express')
const Router = express.Router()

const ctlCustomer = require('../controller/customer')
//[GET]
Router.get('/login', ctlCustomer.login)

Router.get('/destroySsCus', ctlCustomer.destroySS)

//only staff access---------------------------------------
Router.get('/listCustomers', ctlCustomer.listCustomer)

Router.get('/CusDT', ctlCustomer.customerDetail)

Router.get('/addCustomers', ctlCustomer.addCustomer)


//[POST]

module.exports = Router