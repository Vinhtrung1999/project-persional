const express = require('express');
const Router = express.Router();
const checkGet = require('../../../services/auth/checkGet');
const checkLogin = require('../../../services/auth/checkLogin');
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

//[GET]
Router.get('/getStaffs/:idStaff?', checkGet, getStaff);

Router.get('/getCus/:idCus?', checkGet, getCustomer);

Router.get('/getProfileAPI', checkGet, getProfile);

Router.get('/logout', logout);

//[POST]
Router.post('/login', login);

Router.post('/addStaff', checkLogin, addStaff);

Router.post('/changePass', checkLogin, changePass);

Router.post('/pay', checkLogin, pay);

Router.post('/resetPass', checkLogin, resetPass);

Router.post('/addCustomers', checkLogin, addCustomer);

//[UPDATE]
Router.post('/updateStaff', checkLogin, updateStaff);

//[DELETE]
Router.delete('/deleteStaff', checkLogin, deleteStaff);

module.exports = Router;
