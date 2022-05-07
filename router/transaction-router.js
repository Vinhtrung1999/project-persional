const express = require('express')
const Router = express.Router()

const ctlTransaction = require('../controller/transaction')

Router.get('/pay', ctlTransaction.pay)

Router.get('/confirmOTPcode', ctlTransaction.confirmOTPcode)

Router.get('/OTPwrong', ctlTransaction.OTPwrong)

module.exports = Router
