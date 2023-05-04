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