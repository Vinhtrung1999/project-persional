const express = require('express')
const Router = express.Router()
const CheckGet = require('../../auth/CheckGet')
const WH = require('../../models/WH')

Router.get('/getProWH/:idProWH?', CheckGet, (req, res) =>{
    if(!req.session.username)
        return res.json({"code":3, "message":"please login"})

    if(req.session.position !== 2)
        return res.json({"code":5, "message":"Unauthorized"})

    if(req.params.idProWH){
        var idProWH = req.params.idProWH
        
        WH.find({"idProWH":idProWH}).exec((err, data) =>{
            if(err)
                return res.json({"code":99, "message":"err query data"})
            
            if(data.length)
                return res.json({"code":0, "data":data})
            return res.json({"code":6, "message":"id not exist"})
        })
    }else{
        WH.find({}).exec((err, data) =>{
            if(err)
                return res.json({"code":99, "message":"err query data"})
            return res.json({"code":0, "data":data})          
        })
    }
})

module.exports = Router