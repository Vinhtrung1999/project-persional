const express = require('express')
const Router = express.Router()

const ctlCommon = require('../controller/common')
//[GET]
Router.get('/welcome', ctlCommon.welcome)

Router.get('/', ctlCommon.home)
//[POST]

module.exports = Router