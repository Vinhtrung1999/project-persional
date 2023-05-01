require('dotenv').config();
const mongoose = require('mongoose');
const { getConnection } = require('./src/services/database');
const { logger } = require('./src/services/logger');
const staffModel = require('./src/services/models/staff');
const bcrypt = require('bcrypt');
// require Router
const staffManagement = require('./src/controllers/staff-management/staff-management-routes');
const publicAccessManagement = require('./src/controllers/public-access-management/public-access-management-routes');
const managerManagement = require('./src/controllers/manager-management/manager-management-routes');
const customerManagement = require('./src/controllers/customer-management/customer-management-routes');
const statisticManagement = require('./src/controllers/statistic-management/statistic-management-routes');
const billManagement = require('./src/controllers/bill-management/bill-management-routes');
const stadiumManagement = require('./src/controllers/stadium-management/stadium-management-routes');
const productManagement = require('./src/controllers/product-management/product-management-routes');
const inventoryManagement = require('./src/controllers/inventory-management/inventory-management-routes');
const equipmentManagement = require('./src/controllers/equipment-management/equipment-management-routes');
const transactionManagement = require('./src/controllers/transaction-management/transaction-management-routes');
const apiManagement = require('./src/controllers/api-management/api-management-routes');

const routes = async app => {
  await getConnection(logger);
  /*** MANAGER ***/
  app.use('/manager', managerManagement);

  /*** STAFF ***/
  app.use('/staff', staffManagement);

  /*** TRANSACTION ***/
  app.use('/transaction', transactionManagement);

  /*** CUSTOMER ***/
  app.use('/customer', customerManagement);

  /*** STATISTIC ***/
  app.use('/statistic', statisticManagement);

  /*** BILL* ***/
  app.use('/bill', billManagement);

  /*** STADIUM ***/
  app.use('/svd', stadiumManagement);

  /*** PRODUCT ***/
  app.use('/product', productManagement);

  /*** WAREHOUSE ***/
  app.use('/warehouse', inventoryManagement);

  /*** EQUIPMENT ***/
  app.use('/equipment', equipmentManagement);

  /*** COMMON ***/
  app.use('/', publicAccessManagement);

  /*** API ***/
  app.use('/api', apiManagement)

  //===================

  //=========START SYSTEM/=============
  // app.get('/start', (req, res) => {

  //   staffModel.find({ "idStaff": "admin" }).exec((err, data) => {
  //     if (data.length)
  //       return res.json({ code: 0, "message": "started" })
  //     var newStaff = new staffModel({
  //       idStaff: "admin",
  //       password: bcrypt.hashSync("admin", 10),
  //       name: "admin",
  //       gender: 1,
  //       age: 1,
  //       salary: 1,
  //       shift: "Ca1",
  //       position: 0
  //     })

  //     newStaff.save()
  //     return res.json({ code: 0, "message": "started" })
  //   })
  // });
}

module.exports = routes;
