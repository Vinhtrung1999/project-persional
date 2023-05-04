const express = require('express');
const Router = express.Router();
const checkToken = require('../../../services/auth/check-token');
const {
  getEquipment,
  getDamagedEquipment,
  addEquipment,
  updateDamagedEquipment,
} = require('./api-equipment-controllers');
const {
  checkRoleAdminAndEmployeeApi,
  checkRoleEmployeeApi,
} = require('../../../services/auth/check-user-role');

Router.get('/getTTB/:idTTB?', checkToken, checkRoleAdminAndEmployeeApi, getEquipment);
Router.get('/getTTB_Broken/:idTTB_Br?', checkToken, checkRoleAdminAndEmployeeApi, getDamagedEquipment);
Router.post('/addTTB', checkToken, checkRoleEmployeeApi, addEquipment);
Router.post('/updateTTB_broken', checkToken, checkRoleEmployeeApi, updateDamagedEquipment);

module.exports = Router;
