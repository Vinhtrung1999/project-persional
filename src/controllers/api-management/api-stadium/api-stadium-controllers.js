const svds = require('../../models/svds')

class ctlApiSvd{
    //[GET]
    getSvd = async (req, res) =>{
        if(req.params.idSvd){
            let idSvd = req.params.idSvd
            try{
                let data = await svds.find({"idSvd":idSvd}).exec()
                if(data.length)
                    return res.json({"code":0, "data":data})

                return res.json({"code":6, "message":"id not exist"})
            }
            catch(err){
                return res.json({"code":99, "message":"err query data"})
            }
            
        }
        else{
            try{
                let data = await svds.find({}).exec()
                return res.json({"code":0, "data":data})
            }
            catch(err){
                return res.json({"code":99, "message":"err query data"})
            }
        }
    }

    //[POST]
    addSvd = async (req, res) => {
        if(!req.session.username)
            return res.json({"code":3, "message":"please login"})
    
        if(req.session.position !== 2)
            return res.json({"code":5, "message":"Unauthorized"})
    
        let {idSvd, name, status, capacity, type, price, image, image_detail_1, image_detail_2} = req.body
        if(idSvd && name && status && capacity && type && price && image && image_detail_1 && image_detail_2){
            if((parseInt(status) === 0 || parseInt(status) === 1) && parseInt(capacity) >= 0 && (parseInt(type) === 0 || parseInt(type) === 1) && parseInt(price) > 0){
                try{
                    let data = await svds.find({"idSvd":idSvd}).exec()

                    if (data.length > 0)
                        return res.json({"code":8, "message":"id existed, please try again"})

                    let newSvd = new svds({
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

                    await newSvd.save()

                    return res.json({"code":0, "data":newSvd})
                }
                catch(err){
                    return res.json({"code":99, "message":"err query data"})
                }
            }
            else
                return res.json({"code":7, "message":"enter wrong"})
        }
        else
            return res.json({"code":1, "message":"not enough params"})
    }

    //[UPDATE]
    updateSvd = async (req, res) => {
        if(!req.session.username)
            return res.json({"code":3, "message":"please login"})
    
        if(req.session.position !== 2)
            return res.json({"code":5, "message":"Unauthorized"})
    
        let {idSvd, name, status, capacity, type, price, image, image_detail_1, image_detail_2} = req.body
    
        if(idSvd && status && capacity && type && price && image && image_detail_1 && image_detail_2){
            if((parseInt(status) === 0 || parseInt(status) === 1) && parseInt(capacity) > 0 && (parseInt(type) === 0 || parseInt(type) === 1) && parseInt(price) > 0 && image){
                try{
                    let data = await svds.find({"idSvd":idSvd}).exec()
                    if(data.length){
                        let newData = {"type":type,
                                        "capacity":capacity,
                                        "status":status,
                                        "price":price,
                                        "image": image,
                                        "image_detail_1": image_detail_1,
                                        "image_detail_2": image_detail_2}
                        await svds.updateOne({"idSvd":idSvd},{"$set": newData}).exec()
                                        
                        return res.json({"code":0, "message":"Update "+ idSvd +" succeed"})
                    }
                    else{
                        return res.json({"code":6, "message":"id not exist"})
                    }
                }
                catch(err){
                    return res.json({"code":99, "message":"query data wrong"})
                }
            }
            else{
                return res.json({"code":7, "message":"enter wrong"})
            }
        }else
            return res.json({"code":1, "message":"not enough params"})
    }
}
module.exports = new ctlApiSvd