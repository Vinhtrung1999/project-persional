const express = require('express');
const Router = express.Router();

const {
  fee,
  profit,
} = require('./statistic-management-controllers');

Router.get('/fee', fee);

Router.get('/profit', profit);
//[POST]

module.exports = Router;
