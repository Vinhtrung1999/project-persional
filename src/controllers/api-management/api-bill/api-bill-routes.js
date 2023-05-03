const express = require('express');
const Router = express.Router();
const checkToken = require('../../../services/auth/check-token');
const {
  checkRoleAdminAndSaleApi
} = require('../../../services/auth/check-user-role');
const { getBill } = require('./api-bill-controllers');

Router.get('/getBills/:idBill?', checkToken, checkRoleAdminAndSaleApi, getBill);

module.exports = Router;
