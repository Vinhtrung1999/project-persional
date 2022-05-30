const express = require('express')
const Router = express.Router()
const staffs = require('../../models/staffs')
const customers = require('../../models/customers')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const CheckGet = require('../../auth/CheckGet')

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

module.exports = Router