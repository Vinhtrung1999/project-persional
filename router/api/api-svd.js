const express = require('express')
const Router = express.Router()
const CheckGet = require('../../auth/CheckGet')
const CheckLogin = require('../../auth/CheckLogin')
const ctlApiSvd = require('../../controller/api-svd')

//[GET]
Router.get('/getSvd/:idSvd?', ctlApiSvd.getSvd)

//[POST]
Router.post('/addSvd', CheckLogin, ctlApiSvd.addSvd)

//[UPDATE]
Router.post('/updateSvd', CheckLogin, ctlApiSvd.updateSvd)

//[DELETE]

module.exports = Router