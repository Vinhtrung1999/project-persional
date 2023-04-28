const express = require('express');
const Router = express.Router();

const {
  customerLogin,
  destroySession,
  customerList,
  customerDetails,
  addCustomer
} = require('./customer-management-controllers');

Router.get('/login', customerLogin);
Router.get('/destroySsCus', destroySession);
// NOTE: only staff can access---------------------------------------
Router.get('/listCustomers', customerList);
Router.get('/CusDT', customerDetails);
Router.get('/addCustomers', addCustomer);

module.exports = Router;