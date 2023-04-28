const express = require('express')
const Router = express.Router()

const {
  pay,
  incorrectOTP,
  confirmOTPCode,
} = require('./transaction-management-controllers')

Router.get('/pay', pay)

Router.get('/confirmOTPcode', confirmOTPCode)

Router.get('/OTPwrong', incorrectOTP)

module.exports = Router;
