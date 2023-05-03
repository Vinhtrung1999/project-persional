const express = require('express');
const Router = express.Router();
const checkToken = require('../../../services/auth/check-token');
const {
  getStadium,
  addStadium,
  updateStadium,
} = require('./api-stadium-controllers');
const {
  checkRoleEmployeeApi,
} = require('../../../services/auth/check-user-role');

//[GET]
Router.get('/getSvd/:idSvd?', getStadium);

//[POST]
Router.post('/addSvd', checkToken, checkRoleEmployeeApi, addStadium);

//[UPDATE]
Router.post('/updateSvd', checkToken, checkRoleEmployeeApi, updateStadium);

//[DELETE]
module.exports = Router;
