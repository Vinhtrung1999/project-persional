const express = require('express');
const Router = express.Router();
const checkGet = require('../../../services/auth/checkGet');
const {
  getCustomerBills,
  loginCustomer,
} = require('./api-customer-controllers');

Router.get('/getBillsCus/:idBill?', checkGet, getCustomerBills);
Router.post('/loginCus', loginCustomer);

module.exports = Router;
