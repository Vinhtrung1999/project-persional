const express = require('express')
const Router = express.Router()
const CheckGet = require('../../auth/CheckGet')
const CheckLogin = require('../../auth/CheckLogin')
const ctlApiTTB = require('../../controller/api-TTB')
//[GET]
Router.get('/getTTB/:idTTB?', CheckGet, ctlApiTTB.getTTB)

Router.get('/getTTB_Broken/:idTTB_Br?', CheckGet, ctlApiTTB.getTTB_Broken)

//[POST]
Router.post('/addTTB', CheckLogin, ctlApiTTB.addTTB)

//[UPDATE]
Router.post('/updateTTB_broken', CheckLogin, ctlApiTTB.updateTTB_broken)

module.exports = Router