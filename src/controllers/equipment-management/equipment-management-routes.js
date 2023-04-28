const express = require('express')
const Router = express.Router()
const {
  equipmentList,
  damagedEquipmentList,
  damagedEquipmentDetails,
  equipmentDetails,
  addEquipment,
} = require('./equipment-management-controllers');

Router.get('/listEquipment', equipmentList)
Router.get('/listEquipmentDamage', damagedEquipmentList)
Router.get('/equipmentDamageDetail', damagedEquipmentDetails)
Router.get('/equipmentDetail', equipmentDetails)
Router.get('/addEquipment', addEquipment)

module.exports = Router;
