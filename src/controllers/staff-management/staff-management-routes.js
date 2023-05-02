const express = require('express');
const Router = express.Router();
const {
  profile,
  login,
  destroySession,
  changePass,
  staffList,
  staffDetails,
  addStaff,
} = require('./staff-management-controllers');
const {
  checkStaffLogin,
} = require('../../services/auth/checkUserLogin');
const {
  checkRoleAdmin,
} = require('../../services/auth/checkRole');

Router.get('/profile', checkStaffLogin, profile);
Router.get('/login', login);
Router.get('/destroySs', destroySession);
Router.get('/changePass', checkStaffLogin, changePass);
Router.get('/listStaffs', checkStaffLogin, checkRoleAdmin, staffList);
Router.get('/staffDetail', checkStaffLogin, checkRoleAdmin, staffDetails);
Router.get('/addStaff', checkStaffLogin, checkRoleAdmin, addStaff);

module.exports = Router;
