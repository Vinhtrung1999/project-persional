const express = require('express')
const Router = express.Router()
const {
  billList,
  billDetails,
  history,
  historyDetails,
} = require('./bill-management-routes-controllers')

Router.get('/listBills', billList)
Router.get('/billDetail', billDetails)
Router.get('/history', history)
Router.get('/historyDetail', historyDetails)

module.exports = Router;
