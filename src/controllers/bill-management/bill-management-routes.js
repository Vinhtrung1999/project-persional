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
} = require('../../services/auth/checkUserLogin');
const {
  checkRoleSale,
} = require('../../services/auth/checkRole');

Router.get('/listBills', checkStaffLogin, checkRoleSale, billList);
Router.get('/billDetail', checkStaffLogin, checkRoleSale, billDetails);
Router.get('/history', checkStaffLogin, history);
Router.get('/historyDetail', checkStaffLogin, historyDetails);

module.exports = Router;
