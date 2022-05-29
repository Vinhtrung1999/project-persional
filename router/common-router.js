const express = require('express')
const Router = express.Router()

const ctlCommon = require('../controller/common')
//[GET]
//=====================CUSTOMER ACCESS=============================
Router.get('/welcome', ctlCommon.welcome)

Router.get('/list-view-stadiums', ctlCommon.listViewStadiums)

//view detail stadium
Router.get('/view-details', ctlCommon.viewDetail)
//=================================================================

Router.get('/', ctlCommon.home)
//[POST]

module.exports = Router