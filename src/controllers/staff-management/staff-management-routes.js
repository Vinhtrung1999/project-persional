const express = require('express')
const Router = express.Router()

const {
  profile,
  login,
  destroySession,
  changePass,
  staffList,
  staffDetails,
  addStaff,
} = require('./staff-management-controllers');

Router.get('/profile', profile)
Router.get('/login', login)
Router.get('/destroySs', destroySession)
Router.get('/changePass', changePass)
Router.get('/listStaffs', staffList)
Router.get('/staffDetail', staffDetails)
Router.get('/addStaff', addStaff)

module.exports = Router;
