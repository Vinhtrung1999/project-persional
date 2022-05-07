const express = require('express')
const Router = express.Router()

const ctlBill = require('../controller/bill')
//[GET]
Router.get('/listBills', ctlBill.listBill)

Router.get('/billDetail', ctlBill.billDetail)

Router.get('/history', ctlBill.history)

Router.get('/historyDetail', ctlBill.historyDetail)

//[POST]

module.exports = Router