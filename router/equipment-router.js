const express = require('express')
const Router = express.Router()

const ctlEquipment = require('../controller/equipment')

Router.get('/listEquipment', ctlEquipment.listEquipment)

Router.get('/listEquipmentDamage', ctlEquipment.listEquipmentDamage)

Router.get('/equipmentDamageDetail', ctlEquipment.equipmentDamageDetail)

Router.get('/equipmentDetail', ctlEquipment.equipmentDetail)

Router.get('/addEquipment', ctlEquipment.addEquipment)

module.exports = Router