const express = require('express')
const Router = express.Router()
const CheckGet = require('../../auth/CheckGet')
const TTB = require('../../models/TTB')
const TTB_Br = require('../../models/TTB_Br')

Router.get('/getTTB/:idTTB?', CheckGet, (req, res) =>{
    if(!req.session.username)
        return res.json({"code":3, "message":"please login"})

    if(req.session.position !== 0 && req.session.position !== 2)
        return res.json({"code":5, "message":"Unauthorized"})

    if(req.params.idTTB){
        var idTTB = req.params.idTTB
        
        TTB.find({"idTTB":idTTB}).exec((err, data) =>{
            if(err)
                return res.json({"code":99, "message":"err query data"})
            
            if(data.length)
                return res.json({"code":0, "data":data})
            return res.json({"code":6, "message":"id not exist"})
        })
    }else{
        TTB.find({}).exec((err, data) =>{
            if(err)
                return res.json({"code":99, "message":"err query data"})
            return res.json({"code":0, "data":data})          
        })
    }
})

Router.get('/getTTB_Broken/:idTTB_Br?', CheckGet, (req, res) =>{
    if(!req.session.username)
        return res.json({"code":3, "message":"please login"})

    if(req.session.position !== 0 && req.session.position !== 2)
        return res.json({"code":5, "message":"Unauthorized"})

    if(req.params.idTTB_Br){
        var idTTB_Br = req.params.idTTB_Br
        
        TTB_Br.find({"idTTB_Br":idTTB_Br}).exec((err, data) =>{
            if(err)
                return res.json({"code":99, "message":"err query data"})
            
            if(data.length)
                return res.json({"code":0, "data":data})
            return res.json({"code":6, "message":"id not exist"})
        })
    }else{
        TTB_Br.find({}).exec((err, data) =>{
            if(err)
                return res.json({"code":99, "message":"err query data"})
            return res.json({"code":0, "data":data})          
        })
    }
})

module.exports = Router