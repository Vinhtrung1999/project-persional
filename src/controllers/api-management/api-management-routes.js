const express = require('express');
const Router = express.Router();

const apiList = [
  {
    uri: '/bill',
    rootApi: require('./api-bill/api-bill-routes'),
  },
  {
    uri: '/customer',
    rootApi: require('./api-customer/api-customer-routes'),
  },
  {
    uri: '/staff',
    rootApi: require('./api-staff/api-staff-routes'),
  },
  {
    uri: '/svd',
    rootApi: require('./api-stadium/api-stadium-routes'),
  },
  {
    uri: '/equipment',
    rootApi: require('./api-equipment/api-equipment-routes'),
  },
  {
    uri: '/warehouse',
    rootApi: require('./api-inventory/api-inventory-routes'),
  },
  {
    uri: '/product',
    rootApi: require('./api-product/api-product-routes'),
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