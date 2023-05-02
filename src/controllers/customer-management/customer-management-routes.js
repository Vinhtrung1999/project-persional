const express = require('express');
const Router = express.Router();

const {
  customerLogin,
  destroySession,
  customerList,
  customerDetails,
  addCustomer
} = require('./customer-management-controllers');
const {
  checkStaffLogin,
} = require('../../services/auth/checkUserLogin');
const {
  checkRoleSale,
} = require('../../services/auth/checkRole');
Router.get('/login', customerLogin);
Router.get('/destroySsCus', destroySession);
// NOTE: only staff can access---------------------------------------
Router.get('/listCustomers', checkStaffLogin, checkRoleSale, customerList);
Router.get('/CusDT', checkStaffLogin, checkRoleSale, customerDetails);
Router.get('/addCustomers', checkStaffLogin, checkRoleSale, addCustomer);

module.exports = Router;