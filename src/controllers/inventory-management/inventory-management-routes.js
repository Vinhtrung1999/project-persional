const express = require('express');
const Router = express.Router();

const {
  inventoryDetails,
  inventoryList,
  addInventory,
} = require('./inventory-management-controllers');

Router.get('/listWH', inventoryList);
Router.get('/WHDetail', inventoryDetails);
Router.get('/addProWH', addInventory);

module.exports = Router;
