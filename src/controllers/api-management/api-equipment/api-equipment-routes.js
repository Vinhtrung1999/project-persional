const express = require('express');
const Router = express.Router();
const checkGet = require('../../../services/auth/checkGet');
const checkLogin = require('../../../services/auth/checkLogin');
const {
  getEquipment,
  getDamagedEquipment,
  addEquipment,
  updateDamagedEquipment,
} = require('./api-equipment-controllers');

Router.get('/getTTB/:idTTB?', checkGet, getEquipment);
Router.get('/getTTB_Broken/:idTTB_Br?', checkGet, getDamagedEquipment);
Router.post('/addTTB', checkLogin, addEquipment);
Router.post('/updateTTB_broken', checkLogin, updateDamagedEquipment);

module.exports = Router;
