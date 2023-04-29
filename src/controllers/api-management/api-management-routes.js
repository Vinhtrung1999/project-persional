const express = require('express');
const Router = express.Router();

const apiList = [
  {
    uri: '/bill',
    rootApi: require('./api/api-bill'),
  },
  {
    uri: '/customer',
    rootApi: require('./api/api-customer'),
  },
];

apiList.forEach(route => {
  Router.use(route.uri, route.rootApi);
});

module.exports = Router;
// const api_bill = require('./api/api-bill')
// const api_customer = require('./api/api-customer')
// const api_staff = require('./api/api-staff')
// const api_svd = require('./api/api-svd')
// const api_TTB = require('./api/api-TTB')
// const api_proWH = require('./api/api-proWH')
// const api_product = require('./api/api-product')

// Router.use('/bill', api_bill)
// Router.use('/customer', api_customer)
// Router.use('/staff', api_staff)
// Router.use('/svd', api_svd)
// Router.use('/equipment', api_TTB)
// Router.use('/warehouse', api_proWH)
// Router.use('/product', api_product)