const WH = require('../models/WH')
const countInput = require('../models/countInput')
class ctlApiWH{
    //[GET]
    getProWH = (req, res) =>{
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
    }

    getSessionInputPro = (req, res) =>{
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
    }

    //[POST]
    addWh = (req, res) => {
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
    }

    //[DELETE]
    deleteWH = (req, res) => {
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
    }

    //[UPDATE]
    updatePriceProWH = (req, res) => {
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
    }
}
module.exports = new ctlApiWH