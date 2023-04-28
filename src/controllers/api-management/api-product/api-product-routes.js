const express = require('express')
const Router = express.Router()
const CheckGet = require('../../auth/CheckGet')
const CheckLogin = require('../../auth/CheckLogin')
const ctlApiProduct = require('../../controller/api/api-product')

//[GET]
Router.get('/getPro/:idPro?', CheckGet, ctlApiProduct.getPro)

//[POST]
Router.post('/addProduct', CheckLogin, ctlApiProduct.addProduct)

//[DELETE]
Router.delete('/deletePro', CheckLogin, ctlApiProduct.deletePro)

//[UPDATE]
module.exports = Router