const express = require('express')
const Router = express.Router()
const CheckGet = require('../auth/CheckGet')

const ctlStatistic = require('../controller/statistic')
//[GET]
//[../statistic]
Router.get('/fee', ctlStatistic.fee)

Router.get('/profit', ctlStatistic.profit)
//[POST]

module.exports = Router