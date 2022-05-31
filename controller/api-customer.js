const customers = require('../models/customers')
const bills = require('../models/bills')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class ctlApiCustomer{
    //[GET]
    getBillsCus = (req, res) =>{
        if(!req.session.username)
            return res.json({"code":3, "message":"please login"})
    
        if(req.session.position !== 99)
            return res.json({"code":5, "message":"Unauthorized"})
    
        if(req.params.idBill){
            var idBill = req.params.idBill
            
            bills.find({"$and":[{"idBill":idBill}, {"idCus": req.session.username}]}).exec((err, data) =>{
                if(err)
                    return res.json({"code":99, "message":"err query data"})
                
                if(data.length)
                    return res.json({"code":0, "data":data})
                return res.json({"code":6, "message":"id not exist"})
            })
        }else{
            bills.find({"idCus": req.session.username}).exec((err, data) =>{
                if(err)
                    return res.json({"code":99, "message":"err query data"})
                return res.json({"code":0, "data":data})          
            })
        }
    }

    //[POST]
    loginCus = (req, res) =>{
        if(req.session.username)
            return res.json({"code":4, "message":"you have been login!"})
    
        var {CMND, password} = req.body
    
        if (!CMND || !password)
            return res.json({"code":1, "message":"not enough params"})
    
        customers.find({"idCus":CMND}).exec((err, data) =>{
            if(err)
                return res.json({"code":99, "message":"err query data"})
            
            if (data.length && bcrypt.compareSync(password, data[0].password)){
                req.session.username = CMND
                req.session.name = data[0].name
                req.session.position = 99
    
                const JWT_SECRET = process.env.JWT_SECRET
                var salt = Math.floor(Math.random() * 10000) + 1
                var token = jwt.sign({username:CMND, salt:salt}, JWT_SECRET, { expiresIn: '1h' })  
                req.session.token = token
                req.session.salt = salt
                return res.json({"code":0, "user":data, "token":token})
            }   
            return res.json({"code":2, "message":"username or pass wrong!"})     
        })
    }
}
module.exports = new ctlApiCustomer