const express = require('express')
const Router = express.Router()

const ctlSvd = require('../controller/svd')

Router.get('/listSvd', ctlSvd.listSvd)

Router.get('/svdDetail', ctlSvd.svdDetail)

Router.get('/addSvd', ctlSvd.addSvd)

module.exports = Router
