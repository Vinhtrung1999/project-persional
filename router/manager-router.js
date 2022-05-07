const express = require('express')
const Router = express.Router()
const ctlManager = require('../controller/manager')

Router.get('/profile-manager', ctlManager.profile)

Router.get('/staff-manager', ctlManager.staff)

Router.get('/statistic-manager', ctlManager.statistic)

Router.get('/stadium-manager', ctlManager.stadium)

Router.get('/product-manager', ctlManager.product)

Router.get('/equipment-manager', ctlManager.equipment)

Router.get('/warehouse-manager', ctlManager.warehouse)

Router.get('/customer-manager', ctlManager.customer)

Router.get('/view-info-manager', ctlManager.viewInfo)


module.exports = Router