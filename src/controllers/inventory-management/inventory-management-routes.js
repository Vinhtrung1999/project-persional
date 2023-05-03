const express = require('express');
const Router = express.Router();

const {
  inventoryDetails,
  inventoryList,
  addInventory,
} = require('./inventory-management-controllers');
const {
  checkStaffLogin,
} = require('../../services/auth/check-user-login');
const {
  checkRoleEmployee,
} = require('../../services/auth/check-user-role');

Router.get('/listWH', checkStaffLogin, checkRoleEmployee, inventoryList);
Router.get('/WHDetail', checkStaffLogin, checkRoleEmployee, inventoryDetails);
Router.get('/addProWH', checkStaffLogin, checkRoleEmployee, addInventory);

module.exports = Router;
