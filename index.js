const { render } = require('ejs')
const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 8000
const mongoose = require('mongoose')
const db = require('./db')
const fetch = require('node-fetch')
const staffs = require('./models/staffs')
const customers = require('./models/customers')
const products = require('./models/products')
const WH = require('./models/WH')
const svds = require('./models/svds')
const bills = require('./models/bills')
const bcrypt = require('bcrypt')
const session = require('express-session')
const jwt = require('jsonwebtoken')
const CheckLogin = require('./auth/CheckLogin')
const CheckGet = require('./auth/CheckGet')
const nodemailer = require('nodemailer')
const countInput = require('./models/countInput')
const TTB = require('./models/TTB')
const TTB_Br = require('./models/TTB_Br')
const jwtr = require('jwt-redis')
const { exists } = require('./models/staffs')
const { parse } = require('dotenv')
const staffRouter = require('./router/staff-router')
const commonRouter = require('./router/common-router')
const managerRouter = require('./router/manager-router')
const customerRouter = require('./router/customer-router')
const statisticRouter = require('./router/statistic-router')
const billRouter = require('./router/bill-router')
const svdRouter = require('./router/svd-router')
const productRouter = require('./router/product-router')
const WHRouter = require('./router/warehouse-router')
const equipmentRouter = require('./router/equipment-router')
const transactionRouter = require('./router/transaction-router')
const apiRouter = require('./router/api-router')
//set
app.set('view engine', 'ejs')
db.connect()

//use
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(session({secret:"final"}))

//===============***___MANAGER___***====================================
app.use('/manager', managerRouter)

//===============***___STAFF___***======================================
app.use('/staff', staffRouter)

//===============***___TRANSACTION___***================================
app.use('/transaction', transactionRouter)

//===============***___CUSTOMER___***===================================
app.use('/customer', customerRouter)

//===============***___STATISTIC___***==================================
app.use('/statistic', statisticRouter)

//===============***___BILL*___***======================================
app.use('/bill', billRouter)

//===============***___STADIUM___***====================================
app.use('/svd', svdRouter)

//===============***___PRODUCT___***====================================
app.use('/product', productRouter)

//===============***___WAREHOUSE___***==================================
app.use('/warehouse', WHRouter)

//===============***___EQUIPMENT___***==================================
app.use('/equipment', equipmentRouter)

//===============***___COMMON___***=====================================
app.use('/', commonRouter)

//===============***___API___***========================================
app.use('/api', apiRouter)

//======================================================================
//---------test
app.get('/test', async (req, res) =>{

    let sum = (a, b) => {
        return new Promise((rs, rj) => {
            return rs(a + b)
        })
    }

    let a = 0

    await sum(1, 3)
    .then(data => {
        a = data
    })

    return res.end(String(a))
})

//---------deploy
app.get('/start', (req, res) =>{
    
    staffs.find({"idStaff": "admin"}).exec((err, data) => {
        if(data.length)
            return res.json({code:0, "message": "started"})
        var newStaff = new staffs({
            idStaff : "admin",
            password : bcrypt.hashSync("admin", 10),
            name : "admin",
            gender : 1,
            age : 1,
            salery: 1,
            shift: "Ca1",
            position: 0
        })

        newStaff.save()
        return res.json({code:0, "message": "started"})
    })
})

app.listen(port, () => console.log("http://localhost:"+port))