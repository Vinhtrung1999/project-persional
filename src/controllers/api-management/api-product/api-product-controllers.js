const products = require('../../models/products')
const WH = require('../../models/WH')

class ctlApiProduct{
    //[GET]
    getPro = async (req, res) =>{
        if(!req.session.username)
            return res.json({"code":3, "message":"please login"})
    
        if(req.session.position !== 1 && req.session.position !== 2)
            return res.json({"code":5, "message":"Unauthorized"})
    
        if(req.params.idPro){
            //get by id
            let idPro = req.params.idPro
            try{
                let data = await products.find({"idPro":idPro}).exec()
                if(data.length)
                    return res.json({"code":0, "data":data})
                return res.json({"code":6, "message":"id not exist"})
            }
            catch(err){
                return res.json({"code":99, "message":"err query data"})
            }
        }
        else{
            //get all
            try{
                let data = await products.find({}).exec()
                return res.json({"code":0, "data":data})
            }
            catch(err){
                return res.json({"code":99, "message":"err query data"})
            }
        }
    }

    //[POST]
    addProduct = async (req, res) => {
        if(!req.session.username)
            return res.json({"code":3, "message":"please login"})
    
        if(req.session.position !== 2)
            return res.json({"code":5, "message":"Unauthorized"})
    
        let {idPro,qty} = req.body
        if(idPro && qty){
            if(parseInt(qty) > 0){
                let date = new Date();
                let dateIn = date.getFullYear().toString() +"-"+ (date.getMonth()+1).toString() +"-"+ date.getDate().toString()
                
                try{
                    let data = await WH.find({"idProWH":idPro}).exec()
                    if (!data.length)
                        return res.json({"code":10, "message":"products in WH sold out"})
                    
                    //quantity in warehouse not enough required
                    let newqtyWH = parseInt(data[0].qty) - parseInt(qty)
                    if(newqtyWH < 0)
                        return res.json({"code":10, "message":"products not enough - only:" + parseInt(data[0].qty)})

                    let dataPro = await products.find({"name":data[0].name}).exec()

                    //add to product available
                    if (dataPro.length){
                        let newQtyPro = parseInt(qty) + parseInt(dataPro[0].qty)
                        await products.updateOne({"idPro":dataPro[0].idPro}, {"$set":{"qty":newQtyPro, "price":data[0].price, "dateIn":dateIn}}).exec()
                        await WH.updateOne({"idProWH":idPro}, {"$set":{"qty":newqtyWH}}).exec()
                        return res.json({"code":0, "message":"update product succeed"})
                    }
                    //add new product
                    else{
                        let newPro = new products({
                            idPro : idPro,
                            name : data[0].name,
                            type : data[0].type,
                            qty: qty,
                            price: parseInt(data[0].price),
                            dateIn: dateIn
                        })
    
                        await newPro.save()
                        await WH.updateOne({"idProWH":idPro}, {"$set":{"qty":newqtyWH}}).exec()
                        return res.json({"code":0, "data":newPro})
                    }
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

    //[DELETE]
    deletePro = async (req, res) => {
        if(!req.session.username)
            return res.json({"code":3, "message":"please login"})
    
        if(req.session.position !== 2)
            return res.json({"code":5, "message":"Unauthorized"})
    
        let idPro = req.body.idPro
        
        if(idPro){
            try{
                let data = await products.find({"idPro":idPro}).exec()
                if(data.length){
                    await products.deleteOne({"idPro":idPro}).exec()
                    return res.json({"code":0, "message":"Delete "+idPro+" succeed"})
                }
                else{
                    return res.json({"code":6, "message":"id not exist"})
                }
            }
            catch(err){
                return res.json({"code":99, "message":"err query data"})
            }
        }
        else
            return res.json({"code":1, "message":"not enough params"})
    }
}
module.exports = new ctlApiProduct