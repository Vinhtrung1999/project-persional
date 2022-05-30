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
const validator = require("email-validator")
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

app.use('/staff', staffRouter)
//--------manager------------
app.use('/manager', managerRouter)
//--------customer action----
app.use('/transaction', transactionRouter)
//--------customer action----
app.use('/customer', customerRouter)
//--------statistic----------
app.use('/statistic', statisticRouter)
//--------bill----------
app.use('/bill', billRouter)
//--------svd----------
app.use('/svd', svdRouter)
//--------product------
app.use('/product', productRouter)
//--------warehouse------
app.use('/warehouse', WHRouter)
//--------equipment------
app.use('/equipment', equipmentRouter)
//--------common-------------
app.use('/', commonRouter)

//API
app.use('/api', apiRouter)
//----------customer API

//API--------------------------------------------------------------------------------


//get svd

//get TTB

//get TTB broken

//get product WH


//get product


//get session input products
app.get('/getSessionInputPro/:idcount?', CheckGet, (req, res) =>{
    if(!req.session.username)
        return res.json({"code":3, "message":"please login"})

    if(req.session.position !== 0)
        return res.json({"code":5, "message":"Unauthorized"})

    if(req.params.idcount){
        var idcount = req.params.idcount
        
        countInput.find({"idcount":idcount}).exec((err, data) =>{
            if(err)
                return res.json({"code":99, "message":"err query data"})
            
            if(data.length)
                return res.json({"code":0, "data":data})
            return res.json({"code":6, "message":"id not exist"})
        })
    }else{
        countInput.find({}).exec((err, data) =>{
            if(err)
                return res.json({"code":99, "message":"err query data"})
            return res.json({"code":0, "data":data})          
        })
    }
})

//get profile
app.get('/getProfileAPI', CheckGet, (req, res) =>{
    if(!req.session.username)
        return res.json({"code":3, "message":"please login"})

    if(req.session.position !== 0 && req.session.position !== 1 && req.session.position !== 2)
        return res.json({"code":5, "message":"Unauthorized"})

    staffs.find({"idStaff":req.session.username}).exec((err, data) =>{
        if(err)
            return res.json({"code":99, "message":"err query data"})
        return res.json({"code":0, "data":data})          
    })
    
})

//API add staff
app.post('/addStaff', CheckLogin, (req, res) =>{
    if(!req.session.username)
        return res.json({"code":3, "message":"please login"})

    if(req.session.position !== 0)
        return res.json({"code":5, "message":"Unauthorized"})

    var {idStaff,password,name, gender,age,salery,shift,position} = req.body
    if(idStaff && password && name && gender && age && salery && shift && position){
        if(!isNaN(parseInt(age)) && !isNaN(parseInt(gender)) && !isNaN(parseInt(position)) && !isNaN(parseInt(salery))){
            if((parseInt(gender) === 0 || parseInt(gender) === 1) && (parseInt(position) === 0 || parseInt(position) === 1 || parseInt(position) === 2) && parseInt(salery) > 0){
                staffs.find({"idStaff":idStaff}).exec((err, data) =>{
                    if(err)
                        return res.json({"code":99, "message":"err query data"})
                    if (data.length > 0){
                        return res.json({"code":8, "message":"id existed, please try again"})
                    }else{
                            var newStaff = new staffs({
                            idStaff : idStaff,
                            password : bcrypt.hashSync(password, 10),
                            name : name,
                            gender : gender,
                            age : age,
                            salery: salery,
                            shift: shift,
                            position: position
                        })
                
                        newStaff.save()
                        return res.json({"code":0, "message":"add staff "+idStaff+" succeed"})
                    }                    
                })
            }else
            return res.json({"code":7, "message":"enter wrong"})
        }else
        return res.json({"code":7, "message":"enter wrong"})
    }
    else
        return res.json({"code":1, "message":"not enough params"})
})

//API Logout
app.get('/logout', (req, res)=>{
    if(!req.session.username)
        return res.json({"code":3, "message":"please login"})

    req.session.destroy()
    return res.json({"code":0, "message":"logout succeed"})
})

//API change pass
app.post('/changePass', CheckLogin, (req, res)=>{
    if(!req.session.username)
        return res.json({"code":3, "message":"please login"})

    var password = req.body.password
    if(!password)
        return res.json({"code":1, "message":"not enough params"})
    else{
        staffs.updateOne({"idStaff":req.session.username}, {$set: {"password": bcrypt.hashSync(password, 10)}}).exec((err, data)=>{
            if (err) return res.json({"code":99, "message":"err query data"})
        });
        return res.json({"code":0, "message":"change password succeed"}) 
    }    
    
})

//API pay
app.post('/pay', CheckLogin, (req, res)=>{
    if(!req.session.username)
        return res.json({"code":3, "message":"please login"})

    if(req.session.position !== 1)
        return res.json({"code":5, "message":"Unauthorized"})
    
    var {idBill, idCus, listSvd, listProducts, sum, dateUse, dateOrder} = req.body

    if(idBill && listSvd && idCus && sum && dateUse && dateOrder){
        if(listProducts.length == 0 && listSvd.length == 0)
            return res.json({"code":1, "message":"not params"})

        if(isNaN(sum) || parseInt(sum) <= 0)
            return res.json({"code":7, "message":"enter wrong"})

        listProducts.forEach(val =>{
            if(val.qty <= 0)
                return res.json({"code":7, "message":"enter wrong"})
        })    
        var convertDateOrder = new Date(dateOrder);
        var convertDateUse = new Date(dateUse);

        if(convertDateOrder > convertDateUse)
            return res.json({"code":9, "message":"date past"})
        
        var flag = 1
        listSvd.forEach(val => {
            svds.find({"idSvd":val.idSvd})
            .then(data => {
                if(!data.length || data[0].status === 1)
                    flag = 0
            })
            .catch(err => console.log(err))
        })

        setTimeout(() => {
            if(flag === 0)
                return res.json({"code":6, "message":"id not exist or svd ordered"}) 
        
            var flag2 = 1
            listProducts.forEach(val => {
                products.find({"idPro":val.idPro})
                .then(pro => {
                    if(!pro.length)
                        flag2 = 0
                    if(parseInt(pro[0].qty) < parseInt(val.qty))
                        flag2 = 0
                })
                .catch(err => console.log(err))
            })
            setTimeout(() => {
                if(flag2 === 0)
                    return res.json({"code":10, "message":"id product not exist or not enough quantity"})

                bills.find({"idBill":idBill}).exec((err, data) => {
                    if(err)
                        return res.json({"code":99, "message":"err query data"})
    
                    if(data.length)
                        return res.json({"code":8, "message":"id existed"})
                    
                    customers.find({"idCus":idCus}).exec((err, dataCus)=>{
                        if(err)
                        return res.json({"code":99, "message":"err query data"})
    
                        if(!dataCus.length)
                            return res.json({"code":6, "message":"id not exist"})
    
                        var newBill = new bills({
                            idBill :idBill,
                            idCus: idCus,
                            idStaff: req.session.username,
                            listSvd: listSvd,
                            listProducts: listProducts,
                            sum: sum,
                            dateUse: dateUse,
                            dateOrder: dateOrder
                        })
                
                        newBill.save()

                        for (const val of listSvd) {
                            svds.updateOne({"idSvd":val.idSvd}, {"$set":{"status":1}}).exec()
                        }
            
                        for (const pro of listProducts) {
                            products.find({"idPro":pro.idPro}).exec((err, dataPro)=>{
                                var newQty = parseInt(dataPro[0].qty) - parseInt(pro.qty)
                                products.updateOne({"idPro":pro.idPro}, {"$set":{"qty":newQty}}).exec()
                            })
                            
                        }
//mail
                        // var transporter =  nodemailer.createTransport({
                        //     host: 'smtp.gmail.com',
                        //     port: 465,
                        //     secure: true,
                        //     auth: {
                        //         user: "v.trung.12031999@gmail.com",
                        //         pass: "Han12031999"
                        //     },
                        //     tls: {
                        //         rejectUnauthorized: false
                        //     }
                        // })
                        // var mainOptions = {
                        //     from: 'v.trung.12031999@gmail.com',
                        //     to: dataCus[0].email,
                        //     subject: "Order",
                        //     text: 'Pay success\nId saler:'+req.session.username+"\nId bill: "+idBill+"\nMoney: "+sum+"\nDate: "+dateOrder,
                        // }
                    
                        // transporter.sendMail(mainOptions, function(err, info){
                        //     if (err) {
                        //         console.log(err);
                        //     } else {
                        //         console.log('ok')
                        //     }
                        // })

                        return res.json({"code":0, "bill":newBill})
                    })
                })
            },1000)

        }, 1000)
        

    }else
    return res.json({"code":1, "message":"not enough params"})  

})

//API reset pass
app.post('/resetPass', CheckLogin, (req, res)=>{
    if(!req.session.username)
        return res.json({"code":3, "message":"please login"})

    if(req.session.position !== 0)
        return res.json({"code":5, "message":"Unauthorized"})

    var {idStaff,password} = req.body

    if(!password || !idStaff)
        return res.json({"code":1, "message":"not enough params"})
    else{
        staffs.updateOne({"idStaff":idStaff}, {$set: {"password": bcrypt.hashSync(password, 10)}}).exec((err, data)=>{
            if (err)
                return res.json({"code":99, "message":"err query data"})
        })
        return res.json({"code":0, "message":"change password succeed"})
    }
})

//API add Cus
app.post('/addCustomers', CheckLogin, (req, res) => {
    if(!req.session.username)
        return res.json({"code":3, "message":"please login"})

    if(req.session.position !== 1)
        return res.json({"code":5, "message":"Unauthorized"})

    var {name,gender,CMND,phone,email} = req.body
    if(name && CMND && phone && email){
        if((parseInt(gender) === 0 || parseInt(gender) === 1) && validator.validate(email)){
            var idCus = String(CMND)
            customers.find({"idCus":idCus}).exec((err, data) => {
                if(err)
                    return res.json({"code":99, "message":"err query data"})
                if (data.length > 0){
                    return res.json({"code":8, "message":"id existed, please try again"})
                }else{
                    var newCus = new customers({
                        idCus : idCus,
                        password : bcrypt.hashSync(idCus, 10),
                        name : name,
                        gender : gender,
                        CMND: CMND,
                        phone: phone,
                        email:email
                    })
                    
                    newCus.save()

                    return res.json({"code":0, customers:newCus})
                }

            })
        }else
            return res.json({"code":7, "message":"enter wrong"})
    }else
        return res.json({"code":1, "message":"not enough params"})
})

//API add Svd
app.post('/addSvd', CheckLogin, (req, res) => {
    if(!req.session.username)
        return res.json({"code":3, "message":"please login"})

    if(req.session.position !== 2)
        return res.json({"code":5, "message":"Unauthorized"})

    var {idSvd, name, status, capacity, type, price, image, image_detail_1, image_detail_2} = req.body
    if(idSvd && name && status && capacity && type && price && image && image_detail_1 && image_detail_2){
        if((parseInt(status) === 0 || parseInt(status) === 1) && parseInt(capacity) >= 0 && (parseInt(type) === 0 || parseInt(type) === 1) && parseInt(price) > 0){
            
            svds.find({"idSvd":idSvd}).exec((err, data) => {
                if(err)
                    return res.json({"code":99, "message":"err query data"})
                if (data.length > 0){
                    return res.json({"code":8, "message":"id existed, please try again"})
                }else{
                    var newSvd = new svds({
                        idSvd : idSvd,
                        name : name,
                        status : status,
                        capacity : capacity,
                        type : type,
                        image: image,
                        image_detail_1: image_detail_1,
                        image_detail_2: image_detail_2,
                        price: price
                    })

                    newSvd.save()

                    return res.json({"code":0, "data":newSvd})
                }

            })
        }else
            return res.json({"code":7, "message":"enter wrong"})
    }else
        return res.json({"code":1, "message":"not enough params"})
})

//add Wh
app.post('/addWh', CheckLogin, (req, res) => {
    if(!req.session.username)
        return res.json({"code":3, "message":"please login"})

    if(req.session.position !== 2)
        return res.json({"code":5, "message":"Unauthorized"})

    var {idProWH,name,type,qty,priceIn,price} = req.body
    if(idProWH && name && type && qty && price && priceIn){
        if((parseInt(type) === 0 || parseInt(type) === 1 || parseInt(type) === 2) && parseInt(qty) > 0 && parseInt(priceIn) >= 0 && parseInt(price) > 0){
            var date = new Date();
            var dateIn = date.getFullYear().toString() +"-"+ (date.getMonth()+1).toString() +"-"+ date.getDate().toString()
            var idcount = String(Math.floor(Math.random() * (10000000 - 1000000)) + 100000)

            WH.find({"idProWH":idProWH}).exec((err, data) => {
                if(err)
                    return res.json({"code":99, "message":"err query data"})
                if (data.length > 0){
                    
                    if(data[0].name !== name)
                        return res.json({"code":11, "message":"name wrong!"})

                    var newQty = parseInt(qty) + parseInt(data[0].qty)
                    WH.updateOne({"idProWH":idProWH}, {"$set":{"qty":newQty, "price":price, "priceIn":priceIn, "dateIn":dateIn}}).exec()
                        
                    var newCount = new countInput({
                        idcount: idcount,
                        idProWH : idProWH,
                        name : name,
                        qty: qty,
                        priceIn: priceIn,
                        sum : parseInt(qty) * parseInt(priceIn),
                        dateIn: dateIn
                    })

                    newCount.save()

                    return res.json({"code":0, "message":"update product in WH succeed"})
                }else{
                    var newWH = new WH({
                        idProWH : idProWH,
                        name : name,
                        type : type,
                        qty: qty,
                        priceIn: priceIn,
                        price: price,
                        dateIn: dateIn
                    })

                    newWH.save()

                                            
                    var newCount = new countInput({
                        idcount: idcount,
                        idProWH : idProWH,
                        name : name,
                        qty: qty,
                        priceIn: priceIn,
                        sum : parseInt(qty) * parseInt(priceIn),
                        dateIn: dateIn
                    })

                    newCount.save()

                    return res.json({"code":0, "data":newWH})
                }

            })
        }else
            return res.json({"code":7, "message":"enter wrong"})
    }else
        return res.json({"code":1, "message":"not enough params"})
})

//add TTB
app.post('/addTTB', CheckLogin, (req, res) => {
    if(!req.session.username)
        return res.json({"code":3, "message":"please login"})

    if(req.session.position !== 2)
        return res.json({"code":5, "message":"Unauthorized"})

    var {idTTB,name,qty,priceIn} = req.body
    if(idTTB && name && qty && priceIn){
        if(parseInt(priceIn) >= 0 && parseInt(qty) > 0){
            TTB.find({"idTTB":idTTB}).exec((err, data) => {
                var date = new Date();
                var dateIn = date.getFullYear().toString() +"-"+ (date.getMonth()+1).toString() +"-"+ date.getDate().toString()
    
                if(err)
                    return res.json({"code":99, "message":"err query data"})
                if (data.length > 0){
                    
                    if(data[0].name !== name)
                        return res.json({"code":11, "message":"name wrong!"})

                    var newQty = parseInt(qty) + parseInt(data[0].qty)
                    TTB.updateOne({"idTTB":idTTB}, {"$set":{"qty":newQty,"priceIn":priceIn, "dateIn":dateIn}}).exec()
                    
                    return res.json({"code":0, "message":"update product in WH succeed"})
                }else{
                    var newTTB = new TTB({
                        idTTB : idTTB,
                        name : name,
                        qty: qty,
                        priceIn: priceIn,
                        dateIn : dateIn
                    })

                    newTTB.save()
                    return res.json({"code":0, "data":newTTB})
                }

            })
        }else
            return res.json({"code":7, "message":"enter wrong"})
    }else
        return res.json({"code":1, "message":"not enough params"})
})

//add Products
app.post('/addProduct', CheckLogin, (req, res) => {
    if(!req.session.username)
        return res.json({"code":3, "message":"please login"})

    if(req.session.position !== 2)
        return res.json({"code":5, "message":"Unauthorized"})

    var {idPro,qty} = req.body
    if(idPro && qty){
        if(parseInt(qty) > 0){
            var date = new Date();
            var dateIn = date.getFullYear().toString() +"-"+ (date.getMonth()+1).toString() +"-"+ date.getDate().toString()

            WH.find({"idProWH":idPro}).exec((err, data) => {
                if(err)
                    return res.json({"code":99, "message":"err query data"})
                if (!data.length)
                    return res.json({"code":10, "message":"products in WH sold out"})

                var newqtyWH = parseInt(data[0].qty) - parseInt(qty)
                if(newqtyWH < 0)
                    return res.json({"code":10, "message":"products not enough - only:" + parseInt(data[0].qty)})
                
                products.find({"idPro":idPro}).exec((err, dataPro) => {
                    if(err)
                        return res.json({"code":99, "message":"err query data"})
                    if (dataPro.length){
                        var newQtyPro = parseInt(qty) + parseInt(dataPro[0].qty)
                        products.updateOne({"idPro":idPro}, {"$set":{"qty":newQtyPro, "price":data[0].price, "dateIn":dateIn}}).exec()
                        WH.updateOne({"idProWH":idPro}, {"$set":{"qty":newqtyWH}}).exec()
                        return res.json({"code":0, "message":"update product succeed"})

                    }else{
                        var newPro = new products({
                            idPro : idPro,
                            name : data[0].name,
                            type : data[0].type,
                            qty: qty,
                            price: parseInt(data[0].price),
                            dateIn: dateIn
                        })
    
                        newPro.save()
                        WH.updateOne({"idProWH":idPro}, {"$set":{"qty":newqtyWH}}).exec()
                        return res.json({"code":0, "data":newPro})
                    }
                }) 
            })
        }else
            return res.json({"code":7, "message":"enter wrong"})
    }else
        return res.json({"code":1, "message":"not enough params"})
})

//delete staff
app.delete('/deleteStaff', CheckLogin, (req, res) => {
    if(!req.session.username)
        return res.json({"code":3, "message":"please login"})

    if(req.session.position !== 0)
        return res.json({"code":5, "message":"Unauthorized"})

    var idStaff = req.body.idStaff
    
    if(idStaff){
        staffs.find({"idStaff":idStaff}).exec((err, data) => {
            if(data.length){
                staffs.deleteOne({"idStaff":idStaff}).exec()
                return res.json({"code":0, "message":"Delete "+idStaff+" succeed"})
            }
            else{
                return res.json({"code":6, "message":"id not exist"})
            }
        })
    }else
        return res.json({"code":1, "message":"not enough params"})
})

//delete product WH
app.delete('/deleteWH', CheckLogin, (req, res) => {
    if(!req.session.username)
        return res.json({"code":3, "message":"please login"})

    if(req.session.position !== 2)
        return res.json({"code":5, "message":"Unauthorized"})

    var idProWH = req.body.idProWH
    
    if(idProWH){
        WH.find({"idProWH":idProWH}).exec((err, data) => {
            if(data.length){
                WH.deleteOne({"idProWH":idProWH}).exec()
                return res.json({"code":0, "message":"Delete "+idProWH+" succeed"})
            }
            else{
                return res.json({"code":6, "message":"id not exist"})
            }
        })
    }else
        return res.json({"code":1, "message":"not enough params"})
})

//delete product
app.delete('/deletePro', CheckLogin, (req, res) => {
    if(!req.session.username)
        return res.json({"code":3, "message":"please login"})

    if(req.session.position !== 2)
        return res.json({"code":5, "message":"Unauthorized"})

    var idPro = req.body.idPro
    
    if(idPro){
        products.find({"idPro":idPro}).exec((err, data) => {
            if(data.length){
                products.deleteOne({"idPro":idPro}).exec()
                return res.json({"code":0, "message":"Delete "+idPro+" succeed"})
            }
            else{
                return res.json({"code":6, "message":"id not exist"})
            }
        })
    }else
        return res.json({"code":1, "message":"not enough params"})
})

//update pro WH
app.post('/updatePriceProWH', CheckLogin, (req, res) => {
    if(!req.session.username)
        return res.json({"code":3, "message":"please login"})

    if(req.session.position !== 2)
        return res.json({"code":5, "message":"Unauthorized"})

    var idProWH = req.body.idProWH
    var price = req.body.price
    
    if(idProWH && price){
        if(parseInt(price) <= 0)
            return res.json({"code":7, "message":"enter wrong"})
        WH.find({"idProWH":idProWH}).exec((err, data) => {
            if(data.length){
                WH.updateOne({"idProWH":idProWH},{"$set":{"price":price}}).exec()
                return res.json({"code":0, "message":"Update "+idProWH+" succeed"})
            }
            else{
                return res.json({"code":6, "message":"id not exist"})
            }
        })
    }else
        return res.json({"code":1, "message":"not enough params"})
})

//updte svd
app.post('/updateSvd', CheckLogin, (req, res) => {
    if(!req.session.username)
        return res.json({"code":3, "message":"please login"})

    if(req.session.position !== 2)
        return res.json({"code":5, "message":"Unauthorized"})

    let {idSvd, name, status, capacity, type, price, image, image_detail_1, image_detail_2} = req.body

    if(idSvd && status && capacity && type && price && image && image_detail_1 && image_detail_2){
        if((parseInt(status) === 0 || parseInt(status) === 1) && parseInt(capacity) > 0 && (parseInt(type) === 0 || parseInt(type) === 1) && parseInt(price) > 0 && image){
            svds.find({"idSvd":idSvd}).exec((err, data) => {
                if(data.length){
                    svds.updateOne({"idSvd":idSvd},
                                    {"$set":{
                                                "type":type,
                                                "capacity":capacity,
                                                "status":status,
                                                "price":price,
                                                "image": image,
                                                "image_detail_1": image_detail_1,
                                                "image_detail_2": image_detail_2
                                        }
                                    }).exec()
                                    
                    return res.json({"code":0, "message":"Update "+idSvd+" succeed"})
                }
                else{
                    return res.json({"code":6, "message":"id not exist"})
                }
            })
        }else{
            return res.json({"code":7, "message":"enter wrong"})
        }
    }else
        return res.json({"code":1, "message":"not enough params"})
})

//updte TTB broken
app.post('/updateTTB_broken', CheckLogin, (req, res) => {
    if(!req.session.username)
        return res.json({"code":3, "message":"please login"})

    if(req.session.position !== 2)
        return res.json({"code":5, "message":"Unauthorized"})

    var {idTTB,qty} = req.body


    
    if(idTTB && qty){
        if(parseInt(qty) > 0){
            TTB.find({"idTTB":idTTB}).exec((err, data) => {
                if(data.length){
                    if(parseInt(data[0].qty) < parseInt(qty))
                        return res.json({"code":10, "message":"quantity only: "+data[0].qty})

                    var qty_new = parseInt(data[0].qty) - parseInt(qty)
                    TTB.updateOne({"idTTB":idTTB},{"$set":{"qty":qty_new}}).exec()

                    var date = new Date();
                    var dateIn = date.getFullYear().toString() +"-"+ (date.getMonth()+1).toString() +"-"+ date.getDate().toString()

                    var idTTB_Br = String(Math.floor(Math.random() * (10000000 - 1000000)) + 100000)
                    var newTTB_Br = new TTB_Br({
                        idTTB_Br : idTTB_Br,
                        idTTB : idTTB,
                        name : data[0].name,
                        qty: qty,
                        priceIn: data[0].priceIn,
                        dateIn : dateIn
                    })

                    newTTB_Br.save()
                    return res.json({"code":0, "message":"Update "+idTTB+" succeed"})
                }
                else{
                    return res.json({"code":6, "message":"id not exist"})
                }
            })
        }else{
            return res.json({"code":7, "message":"enter wrong"})
        }
    }else
        return res.json({"code":1, "message":"not enough params"})
})

//updte staff
app.post('/updateStaff', CheckLogin, (req, res) => {
    if(!req.session.username)
        return res.json({"code":3, "message":"please login"})

    if(req.session.position !== 0)
        return res.json({"code":5, "message":"Unauthorized"})

    var {idStaff, shift, salery, position} = req.body


    
    if(idStaff && shift && salery && position){
        if((parseInt(position) === 0 || parseInt(position) === 1 || parseInt(position) === 2) && parseInt(salery) > 0){
            staffs.find({"idStaff":idStaff}).exec((err, data) => {
                if(data.length){
                    staffs.updateOne({"idStaff":idStaff},{"$set":{"shift":shift, "position":position, "salery":salery}}).exec()
                    return res.json({"code":0, "message":"Update "+idStaff+" succeed"})
                }
                else{
                    return res.json({"code":6, "message":"id not exist"})
                }
            })
        }else{
            return res.json({"code":7, "message":"enter wrong"})
        }
    }else
        return res.json({"code":1, "message":"not enough params"})
})

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