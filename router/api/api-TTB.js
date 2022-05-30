const express = require('express')
const Router = express.Router()
const CheckGet = require('../../auth/CheckGet')
const CheckLogin = require('../../auth/CheckLogin')
const TTB = require('../../models/TTB')
const TTB_Br = require('../../models/TTB_Br')

//[GET]
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

//[POST]
Router.post('/addTTB', CheckLogin, (req, res) => {
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

//[UPDATE]
Router.post('/updateTTB_broken', CheckLogin, (req, res) => {
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

module.exports = Router