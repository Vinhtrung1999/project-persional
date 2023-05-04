const express = require('express');
const Router = express.Router();
const {
  equipmentList,
  damagedEquipmentList,
  damagedEquipmentDetails,
  equipmentDetails,
  addEquipment,
} = require('./equipment-management-controllers');
const {
  checkStaffLogin,
} = require('../../services/auth/check-user-login');
const {
  checkRoleEmployee,
} = require('../../services/auth/check-user-role');

Router.get('/listEquipment', checkStaffLogin, checkRoleEmployee, equipmentList);
Router.get('/listEquipmentDamage', checkStaffLogin, checkRoleEmployee, damagedEquipmentList);
Router.get('/equipmentDamageDetail', checkStaffLogin, checkRoleEmployee, damagedEquipmentDetails);
Router.get('/equipmentDetail', checkStaffLogin, checkRoleEmployee, equipmentDetails);
Router.get('/addEquipment', checkStaffLogin, checkRoleEmployee, addEquipment);

module.exports = Router;
