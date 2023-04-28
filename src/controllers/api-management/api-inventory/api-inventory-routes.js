const express = require('express')
const Router = express.Router()
const CheckGet = require('../../auth/CheckGet')
const CheckLogin = require('../../auth/CheckLogin')
const ctlApiWH = require('../../controller/api/api-WH')
//[GET]
Router.get('/getProWH/:idProWH?', CheckGet, ctlApiWH.getProWH)

Router.get('/getSessionInputPro/:idcount?', CheckGet, ctlApiWH.getSessionInputPro)

//[POST]
Router.post('/addWh', CheckLogin, ctlApiWH.addWh)

//[DELETE]
Router.delete('/deleteWH', CheckLogin, ctlApiWH.deleteWH)

//[UPDATE]
Router.post('/updatePriceProWH', CheckLogin, ctlApiWH.updatePriceProWH)

module.exports = Router