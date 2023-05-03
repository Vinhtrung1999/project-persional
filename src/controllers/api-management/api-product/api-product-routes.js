const express = require('express');
const Router = express.Router();
const checkToken = require('../../../services/auth/check-token');
const {
  getProduct,
  addProduct,
  deleteProduct,
} = require('./api-product-controllers');
const {
  checkRoleEmployeeApi,
  checkRoleSaleAndEmployeeApi,
} = require('../../../services/auth/check-user-role');

//[GET]
Router.get('/getPro/:idPro?', checkToken, checkRoleSaleAndEmployeeApi, getProduct);

//[POST]
Router.post('/addProduct', checkToken, checkRoleEmployeeApi, addProduct);

//[DELETE]
Router.delete('/deletePro', checkToken, checkRoleEmployeeApi, deleteProduct);

//[UPDATE]
module.exports = Router;
