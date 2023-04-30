const express = require('express');
const Router = express.Router();
const checkGet = require('../../../services/auth/checkGet');
const checkLogin = require('../../../services/auth/checkLogin');
const {
  getProduct,
  addProduct,
  deleteProduct,
} = require('./api-product-controllers');

//[GET]
Router.get('/getPro/:idPro?', checkGet, getProduct);

//[POST]
Router.post('/addProduct', checkLogin, addProduct);

//[DELETE]
Router.delete('/deletePro', checkLogin, deleteProduct);

//[UPDATE]
module.exports = Router;
