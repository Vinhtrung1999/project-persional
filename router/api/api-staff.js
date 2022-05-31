const express = require('express')
const Router = express.Router()
const CheckGet = require('../../auth/CheckGet')
const CheckLogin = require('../../auth/CheckLogin')
const ctlApiStaff = require('../../controller/api-staff')

//[GET]
Router.get('/getStaffs/:idStaff?', CheckGet, ctlApiStaff.getStaffs)

Router.get('/getCus/:idCus?', CheckGet, ctlApiStaff.getCus)

Router.get('/getProfileAPI', CheckGet, ctlApiStaff.getProfileAPI)

Router.get('/logout', ctlApiStaff.logout)

//[POST]
Router.post('/login', ctlApiStaff.login)

Router.post('/addStaff', CheckLogin, ctlApiStaff.addStaff)

Router.post('/changePass', CheckLogin, ctlApiStaff.changePass)

Router.post('/pay', CheckLogin, ctlApiStaff.pay)

Router.post('/resetPass', CheckLogin, ctlApiStaff.resetPass)

Router.post('/addCustomers', CheckLogin, ctlApiStaff.addCustomers)

//[UPDATE]
Router.post('/updateStaff', CheckLogin, ctlApiStaff.updateStaff)

//[DELETE]
Router.delete('/deleteStaff', CheckLogin, ctlApiStaff.deleteStaff)

module.exports = Router