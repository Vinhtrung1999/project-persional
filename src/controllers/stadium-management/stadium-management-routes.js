const express = require('express');
const Router = express.Router();
const {
  stadiumDetails,
  stadiumList,
  addStadium,
} = require('./stadium-management-controllers');
const {
  checkStaffLogin,
} = require('../../services/auth/checkUserLogin');
const {
  checkRoleSaleAndEmployee,
  checkRoleEmployee,
} = require('../../services/auth/checkRole');

Router.get('/listSvd', checkStaffLogin, checkRoleSaleAndEmployee, stadiumList);
Router.get('/svdDetail', checkStaffLogin, checkRoleSaleAndEmployee, stadiumDetails);
Router.get('/addSvd', checkStaffLogin, checkRoleEmployee, addStadium);

module.exports = Router;
