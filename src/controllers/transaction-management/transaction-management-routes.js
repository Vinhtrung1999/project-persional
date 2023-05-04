const express = require('express');
const Router = express.Router();
const {
  pay,
  incorrectOTP,
  confirmOTPCode,
} = require('./transaction-management-controllers');
const {
  checkStaffLogin,
} = require('../../services/auth/check-user-login');
const {
  checkRoleSale,
} = require('../../services/auth/check-user-role');

Router.get('/pay', checkStaffLogin, checkRoleSale, pay);

Router.get('/confirmOTPcode', checkStaffLogin, checkRoleSale, confirmOTPCode);

Router.get('/OTPwrong', checkStaffLogin, checkRoleSale, incorrectOTP);

module.exports = Router;
