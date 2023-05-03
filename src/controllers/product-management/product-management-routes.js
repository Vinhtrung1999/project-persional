const express = require('express');
const Router = express.Router();

const {
  productDetails,
  productList,
  addProduct,
} = require('./product-management-controllers');
const {
  checkStaffLogin,
} = require('../../services/auth/check-user-login');
const {
  checkRoleSaleAndEmployee,
  checkRoleEmployee,
} = require('../../services/auth/check-user-role');

Router.get('/listProducts', checkStaffLogin, checkRoleSaleAndEmployee, productList);
Router.get('/ProDetail', checkStaffLogin, checkRoleSaleAndEmployee, productDetails);
Router.get('/addProduct', checkStaffLogin, checkRoleEmployee, addProduct);

module.exports = Router;
