const express = require('express')
const Router = express.Router()
const staffs = require('../../models/staffs')
const svds = require('../../models/svds')
const products = require('../../models/products')
const bills = require('../../models/bills')
const customers = require('../../models/customers')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const CheckGet = require('../../auth/CheckGet')
const CheckLogin = require('../../auth/CheckLogin')
const validator = require("email-validator")

//[GET]
Router.get('/getStaffs/:idStaff?', CheckGet, (req, res) =>{
    if(!req.session.username)
        return res.json({"code":3, "message":"please login"})

    if(req.session.position !== 0)
        return res.json({"code":5, "message":"Unauthorized"})

    if(req.params.idStaff){
        let idStaff = req.params.idStaff
        
        staffs.find({"idStaff":idStaff}).exec((err, data) =>{
            if(err)
                return res.json({"code":99, "message":"err query data"})
            
            if(data.length)
                return res.json({"code":0, "data":data})
            return res.json({"code":6, "message":"id not exist"})
        })
    }else{
        staffs.find({}).exec((err, data) =>{
            if(err)
                return res.json({"code":99, "message":"err query data"})
            return res.json({"code":0, "data":data})          
        })
    }
})

Router.get('/getCus/:idCus?', CheckGet, (req, res) =>{
    if(!req.session.username)
        return res.json({"code":3, "message":"please login"})

    if(req.session.position !== 1)
        return res.json({"code":5, "message":"Unauthorized"})

    if(req.params.idCus){
        let idCus = req.params.idCus
        
        customers.find({"idCus":idCus}).exec((err, data) =>{
            if(err)
                return res.json({"code":99, "message":"err query data"})
            
            if(data.length)
                return res.json({"code":0, "data":data})
            return res.json({"code":6, "message":"id not exist"})
        })
    }else{
        customers.find({}).exec((err, data) =>{
            if(err)
                return res.json({"code":99, "message":"err query data"})
            return res.json({"code":0, "data":data})          
        })
    }
})

Router.get('/getProfileAPI', CheckGet, (req, res) =>{
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

Router.get('/logout', (req, res)=>{
    if(!req.session.username)
        return res.json({"code":3, "message":"please login"})

    req.session.destroy()
    return res.json({"code":0, "message":"logout succeed"})
})

//[POST]
Router.post('/login', (req, res) =>{
    if(req.session.username)
        return res.json({"code":4, "message":"you have been login!"})

    let {username, password} = req.body

    if (!username || !password)
        return res.json({"code":1, "message":"not enough params"})

    staffs.find({"idStaff":username}).exec((err, data) =>{
        if(err)
            return res.json({"code":99, "message":"err query data"})
        
        if (data.length && bcrypt.compareSync(password, data[0].password)){
            req.session.username = username
            req.session.name = data[0].name
            req.session.position = data[0].position

            const JWT_SECRET = process.env.JWT_SECRET
            let salt = Math.floor(Math.random() * 10000) + 1
            let token = jwt.sign({username:username, salt:salt}, JWT_SECRET, { expiresIn: '1h' })  
            req.session.token = token
            req.session.salt = salt
            return res.json({"code":0, "user":data, "token":token})
        }   
        return res.json({"code":2, "message":"username or pass wrong!"})     
    })
})

Router.post('/addStaff', CheckLogin, (req, res) =>{
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

Router.post('/changePass', CheckLogin, (req, res)=>{
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

Router.post('/pay', CheckLogin, (req, res)=>{
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
                        return res.json({"code":0, "bill":newBill})
                    })
                })
            },1000)

        }, 1000)
        

    }
    else
        return res.json({"code":1, "message":"not enough params"})  
})

Router.post('/resetPass', CheckLogin, (req, res)=>{
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

Router.post('/addCustomers', CheckLogin, (req, res) => {
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

//[UPDATE]
Router.post('/updateStaff', CheckLogin, (req, res) => {
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
    }
    else
        return res.json({"code":1, "message":"not enough params"})
})

//[DELETE]
Router.delete('/deleteStaff', CheckLogin, (req, res) => {
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

module.exports = Router