const express = require('express');
const Router = express.Router();
const checkLogin = require('../../../services/auth/checkLogin');
const {
  getStadium,
  addStadium,
  updateStadium,
} = require('./api-stadium-controllers');

//[GET]
Router.get('/getSvd/:idSvd?', getStadium);

//[POST]
Router.post('/addSvd', checkLogin, addStadium);

//[UPDATE]
Router.post('/updateSvd', checkLogin, updateStadium);

//[DELETE]
module.exports = Router;
