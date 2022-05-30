const express = require('express')
const Router = express.Router()
const CheckGet = require('../../auth/CheckGet')
const svds = require('../../models/svds')

Router.get('/getSvd/:idSvd?', (req, res) =>{
    if(req.params.idSvd){
        let idSvd = req.params.idSvd
        
        svds.find({"idSvd":idSvd}).exec((err, data) =>{
            if(err)
                return res.json({"code":99, "message":"err query data"})
            
            if(data.length)
                return res.json({"code":0, "data":data})
            return res.json({"code":6, "message":"id not exist"})
        })
    }else{
        svds.find({}).exec((err, data) =>{
            if(err)
                return res.json({"code":99, "message":"err query data"})
            return res.json({"code":0, "data":data})          
        })
    }
})

module.exports = Router