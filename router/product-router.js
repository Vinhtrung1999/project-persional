const express = require('express')
const Router = express.Router()

const ctlProduct = require('../controller/product')

Router.get('/listProducts', ctlProduct.listProduct)

Router.get('/ProDetail', ctlProduct.productDetail)

Router.get('/addProduct', ctlProduct.addProduct)

module.exports = Router
