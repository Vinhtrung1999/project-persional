const express = require('express')
const Router = express.Router()
const CheckGet = require('../../auth/CheckGet')
const ctlApiBill = require('../../controller/api-bill')
//[GET]
//[.../api/getBill/:idBill?]
Router.get('/getBills/:idBill?', CheckGet, ctlApiBill.getBill)

module.exports = Router