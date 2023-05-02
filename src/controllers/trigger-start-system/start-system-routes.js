const express = require('express');
const Router = express.Router();

const {
  addAdmin,
} = require('./start-system-handlers');

Router.get('/', addAdmin);

module.exports = Router;
