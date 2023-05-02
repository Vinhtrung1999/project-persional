const express = require('express');
const Router = express.Router();
const {
  checkStaffLogin,
} = require('../../services/auth/checkUserLogin');
const {
  checkRoleAdmin,
} = require('../../services/auth/checkRole');
const {
  fee,
  profit,
} = require('./statistic-management-controllers');

Router.get('/fee', checkStaffLogin, checkRoleAdmin, fee);

Router.get('/profit', checkStaffLogin, checkRoleAdmin, profit);

module.exports = Router;
