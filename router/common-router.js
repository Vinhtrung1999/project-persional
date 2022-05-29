const express = require('express')
const Router = express.Router()

const ctlCommon = require('../controller/common')
//[GET]
Router.get('/welcome', ctlCommon.welcome)

Router.get('/list-view-stadiums', ctlCommon.listViewStadiums)

Router.get('/', ctlCommon.home)
//[POST]

module.exports = Router