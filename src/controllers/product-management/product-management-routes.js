const express = require('express');
const Router = express.Router();

const {
  productDetails,
  productList,
  addProduct,
} = require('./product-management-controllers');

Router.get('/listProducts', productList);
Router.get('/ProDetail', productDetails);
Router.get('/addProduct', addProduct);

module.exports = Router;
