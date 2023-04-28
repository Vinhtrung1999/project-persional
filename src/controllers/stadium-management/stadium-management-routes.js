const express = require('express');
const Router = express.Router();

const {
  stadiumDetails,
  stadiumList,
  addStadium,
} = require('./stadium-management-controllers');

Router.get('/listSvd', stadiumList);
Router.get('/svdDetail', stadiumDetails);
Router.get('/addSvd', addStadium);

module.exports = Router;
