const express = require('express');
const Router = express.Router();
const checkToken = require('../../../services/auth/check-token');
const {
  getStaff,
  getCustomer,
  getProfile,
  logout,
  login,
  addStaff,
  changePass,
  resetPass,
  pay,
  addCustomer,
  updateStaff,
  deleteStaff,
} = require('./api-staff-controllers');
const {
  checkRoleAdminApi,
  checkRoleSaleApi,
  checkRoleSaleAndEmployeeApi,
} = require('../../../services/auth/check-user-role');

//[GET]
Router.get('/getStaffs/:idStaff?', checkToken, checkRoleAdminApi, getStaff);

Router.get('/getCus/:idCus?', checkToken, checkRoleSaleApi, getCustomer);

Router.get('/getProfileAPI', checkToken, getProfile);

Router.get('/logout', checkToken, logout);

//[POST]
Router.post('/login', login);

Router.post('/addStaff', checkToken, checkRoleAdminApi, addStaff);

Router.post('/changePass', checkToken, changePass);

Router.post('/pay', checkToken, checkRoleSaleApi, pay);

Router.post('/resetPass', checkToken, checkRoleAdminApi, resetPass);

Router.post('/addCustomers', checkToken, checkRoleSaleApi, addCustomer);

//[UPDATE]
Router.post('/updateStaff', checkToken, checkRoleAdminApi, updateStaff);

//[DELETE]
Router.delete('/deleteStaff', checkToken, checkRoleAdminApi, deleteStaff);

module.exports = Router;
