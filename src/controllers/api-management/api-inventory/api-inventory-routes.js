const express = require('express');
const Router = express.Router();
const checkToken = require('../../../services/auth/check-token');
const {
  getBatchInput,
  getInventory,
  addInventory,
  deleteInventory,
  updatePriceForProductInventory,
} = require('./api-inventory-controllers');
const {
  checkRoleEmployeeApi,
  checkRoleAdminApi,
} = require('../../../services/auth/check-user-role');

Router.get('/getProWH/:idProWH?', checkToken, checkRoleEmployeeApi, getInventory);

Router.get('/getSessionInputPro/:idcount?', checkToken, checkRoleAdminApi, getBatchInput);

Router.post('/addWh', checkToken, checkRoleEmployeeApi, addInventory);

Router.delete('/deleteWH', checkToken, checkRoleEmployeeApi, deleteInventory);

Router.post('/updatePriceProWH', checkToken, checkRoleEmployeeApi, updatePriceForProductInventory);

module.exports = Router;
