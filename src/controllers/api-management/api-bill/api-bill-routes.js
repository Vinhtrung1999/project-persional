const express = require('express');
const Router = express.Router();
const checkGet = require('../../../services/auth/checkGet');
const { getBill } = require('./api-bill-controllers');

Router.get('/getBills/:idBill?', checkGet, getBill);

module.exports = Router;
