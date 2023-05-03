const express = require('express');
const Router = express.Router();
const checkToken = require('../../../services/auth/check-token');
const {
  getCustomerBills,
  loginCustomer,
} = require('./api-customer-controllers');

Router.get('/getBillsCus/:idBill?', checkToken, getCustomerBills);
Router.post('/loginCus', loginCustomer);

module.exports = Router;
