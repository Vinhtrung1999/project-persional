const express = require('express')
const Router = express.Router()
const CheckGet = require('../auth/CheckGet')

const ctlStaff = require('../controller/staff')
//[GET]
Router.get('/getStaffs/:idStaff?', CheckGet, ctlStaff.getStaffs)
//[POST]

module.exports = Router