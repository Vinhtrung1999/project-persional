const express = require('express');
const Router = express.Router();

const {
  welcomeView,
  stadiumListView,
  homeView,
  viewDetails,
} = require('./public-access-management-controllers');

Router.get('/welcome', welcomeView);
Router.get('/list-view-stadiums', stadiumListView);
//view detail stadium
Router.get('/view-details', viewDetails);
//=================================================================
Router.get('/', homeView);

module.exports = Router;
