const express = require('express');
const Router = express.Router();

const {
  inventoryDetails,
  inventoryList,
  addInventory,
} = require('./inventory-management-controllers');
const {
  checkStaffLogin,
} = require('../../services/auth/checkUserLogin');
const {
  checkRoleEmployee,
} = require('../../services/auth/checkRole');

Router.get('/listWH', checkStaffLogin, checkRoleEmployee, inventoryList);
Router.get('/WHDetail', checkStaffLogin, checkRoleEmployee, inventoryDetails);
Router.get('/addProWH', checkStaffLogin, checkRoleEmployee, addInventory);

module.exports = Router;
