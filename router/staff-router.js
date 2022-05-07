const express = require('express')
const Router = express.Router()
const CheckGet = require('../auth/CheckGet')

const ctlStaff = require('../controller/staff')
//[GET]
//[../staff]
Router.get('/profile', ctlStaff.profile)

Router.get('/login', ctlStaff.login)

Router.get('/destroySs', ctlStaff.destroySS)

Router.get('/changePass', ctlStaff.changePass)

Router.get('/listStaffs', ctlStaff.listStaff)

Router.get('/staffDetail', ctlStaff.staffDetail)

Router.get('/addStaff', ctlStaff.addStaff)
//[POST]

module.exports = Router