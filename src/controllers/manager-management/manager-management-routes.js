const express = require('express');
const Router = express.Router();
const {
  inventoryList,
  equipmentList,
  productList,
  profile,
  stadiumList,
  staffList,
  statisticList,
  customerList,
  viewInfo,
} = require('./manager-management-controllers');;
const {
  checkStaffLogin,
} = require('../../services/auth/checkUserLogin');
const {
  checkRoleAdmin,
  checkRoleSale,
  checkRoleEmployee,
} = require('../../services/auth/checkRole');

Router.get('/profile-manager', checkStaffLogin, profile);
Router.get('/staff-manager', checkStaffLogin, checkRoleAdmin, staffList);
Router.get('/statistic-manager', checkStaffLogin, checkRoleAdmin, statisticList);
Router.get('/stadium-manager', checkStaffLogin, checkRoleEmployee, stadiumList);
Router.get('/product-manager', checkStaffLogin, checkRoleEmployee, productList);
Router.get('/equipment-manager', checkStaffLogin, checkRoleEmployee, equipmentList);
Router.get('/warehouse-manager', checkStaffLogin, checkRoleEmployee, inventoryList);
Router.get('/customer-manager', checkStaffLogin, checkRoleSale, customerList);
Router.get('/view-info-manager', checkStaffLogin, checkRoleSale, viewInfo);

module.exports = Router;
