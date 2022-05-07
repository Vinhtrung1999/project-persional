const express = require('express')
const Router = express.Router()

const ctlWH = require('../controller/warehouse')

Router.get('/listWH', ctlWH.listWarehouse)

Router.get('/WHDetail', ctlWH.warehouseDetail)

Router.get('/addProWH', ctlWH.addProductWH)

module.exports = Router
