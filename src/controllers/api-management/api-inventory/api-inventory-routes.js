const express = require('express');
const Router = express.Router();
const checkGet = require('../../../services/auth/checkGet');
const checkLogin = require('../../../services/auth/checkLogin');
const {
  getBatchInput,
  getInventory,
  addInventory,
  deleteInventory,
  updatePriceForProductInventory,
} = require('./api-inventory-controllers');

Router.get('/getProWH/:idProWH?', checkGet, getInventory);

Router.get('/getSessionInputPro/:idcount?', checkGet, getBatchInput);

Router.post('/addWh', checkLogin, addInventory);

Router.delete('/deleteWH', checkLogin, deleteInventory);

Router.post('/updatePriceProWH', checkLogin, updatePriceForProductInventory);

module.exports = Router;
