const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 3000
const mongoose = require('mongoose')
const db = require('./db')
const staffs = require('./models/staffs')
const bcrypt = require('bcrypt')
const session = require('express-session')
// require Router
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
const cors = require('cors')
//set
app.set('view engine', 'ejs')
db.connect()

//use
app.use(cors())
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

//=========START SYSTEM=================================================
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
            salary: 1,
            shift: "Ca1",
            position: 0
        })

        newStaff.save()
        return res.json({code:0, "message": "started"})
    })
})

app.listen(port, () => console.log("http://localhost:"+port))