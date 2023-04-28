const express = require('express');
const Router = express.Router();
const {
  inventory,
  equipment,
  products,
  profile,
  stadiums,
  staffs,
  statistic,
  customers,
  viewInfo,
} = require('./manager-management-controllers');;

Router.get('/profile-manager', profile);
Router.get('/staff-manager', staffs);
Router.get('/statistic-manager', statistic);
Router.get('/stadium-manager', stadiums);
Router.get('/product-manager', products);
Router.get('/equipment-manager', equipment);
Router.get('/warehouse-manager', inventory);
Router.get('/customer-manager', customers);
Router.get('/view-info-manager', viewInfo);

module.exports = Router;
