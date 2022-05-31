const svds = require('../models/svds')

class ctlApiSvd{
    //[GET]
    getSvd = (req, res) =>{
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
    }

    //[POST]
    addSvd = (req, res) => {
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
    }

    //[UPDATE]
    updateSvd = (req, res) => {
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
    }
}
module.exports = new ctlApiSvd