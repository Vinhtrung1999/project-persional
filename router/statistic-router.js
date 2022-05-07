const express = require('express')
const Router = express.Router()
const CheckGet = require('../auth/CheckGet')

const ctlStatistic = require('../controller/statistic')
//[GET]
//[../statistic]
app.get('/fee', ctlStatistic.fee)

app.get('/profit', ctlStatistic.profit)
//[POST]

module.exports = Router