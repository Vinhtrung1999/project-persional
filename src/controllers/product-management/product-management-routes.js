const express = require('express');
const Router = express.Router();

const {
  productDetails,
  productList,
  addProduct,
} = require('./product-management-controllers');
const {
  checkStaffLogin,
} = require('../../services/auth/checkUserLogin');
const {
  checkRoleSaleAndEmployee,
  checkRoleEmployee,
} = require('../../services/auth/checkRole');

Router.get('/listProducts', checkStaffLogin, checkRoleSaleAndEmployee, productList);
Router.get('/ProDetail', checkStaffLogin, checkRoleSaleAndEmployee, productDetails);
Router.get('/addProduct', checkStaffLogin, checkRoleEmployee, addProduct);

module.exports = Router;
