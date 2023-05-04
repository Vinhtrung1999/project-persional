const express = require('express');
const Router = express.Router();
const {
  billList,
  billDetails,
  history,
  historyDetails,
} = require('./bill-management-routes-controllers');
const {
  checkStaffLogin,
} = require('../../services/auth/check-user-login');
const {
  checkRoleSale,
} = require('../../services/auth/check-user-role');

Router.get('/listBills', checkStaffLogin, checkRoleSale, billList);
Router.get('/billDetail', checkStaffLogin, checkRoleSale, billDetails);
Router.get('/history', checkStaffLogin, history);
Router.get('/historyDetail', checkStaffLogin, historyDetails);

module.exports = Router;
