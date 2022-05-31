const express = require('express')
const Router = express.Router()

const CheckGet = require('../../auth/CheckGet')
const ctlApiCustomer = require('../../controller/api-customer')
//[GET]
Router.get('/getBillsCus/:idBill?', CheckGet, ctlApiCustomer.getBillsCus)

//[POST]
Router.post('/loginCus', ctlApiCustomer.loginCus)

module.exports = Router