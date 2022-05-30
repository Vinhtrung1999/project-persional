const express = require('express')
const Router = express.Router()
const CheckGet = require('../../auth/CheckGet')
const CheckLogin = require('../../auth/CheckLogin')
const products = require('../../models/products')
const WH = require('../../models/WH')

//[GET]
Router.get('/getPro/:idPro?', CheckGet, (req, res) =>{
    if(!req.session.username)
        return res.json({"code":3, "message":"please login"})

    if(req.session.position !== 1 && req.session.position !== 2)
        return res.json({"code":5, "message":"Unauthorized"})

    if(req.params.idPro){
        var idPro = req.params.idPro
        
        products.find({"idPro":idPro}).exec((err, data) =>{
            if(err)
                return res.json({"code":99, "message":"err query data"})
            
            if(data.length)
                return res.json({"code":0, "data":data})
            return res.json({"code":6, "message":"id not exist"})
        })
    }else{
        products.find({}).exec((err, data) =>{
            if(err)
                return res.json({"code":99, "message":"err query data"})
            return res.json({"code":0, "data":data})          
        })
    }
})

//[POST]
Router.post('/addProduct', CheckLogin, (req, res) => {
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

//[DELETE]
Router.delete('/deletePro', CheckLogin, (req, res) => {
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

//[UPDATE]
module.exports = Router