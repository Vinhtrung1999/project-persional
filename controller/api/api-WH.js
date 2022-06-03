const WH = require('../../models/WH')
const countInput = require('../../models/countInput')
class ctlApiWH{
    //[GET]
    getProWH = async (req, res) =>{
        if(!req.session.username)
            return res.json({"code":3, "message":"please login"})
    
        if(req.session.position !== 2)
            return res.json({"code":5, "message":"Unauthorized"})
    
        if(req.params.idProWH){
            let idProWH = req.params.idProWH
            try {
                let data = await WH.find({"idProWH":idProWH}).exec()
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
                let data = await WH.find({}).exec()
                return res.json({"code":0, "data":data})          
            }
            catch(err){
                return res.json({"code":99, "message":"err query data"})
            }
        }
    }

    getSessionInputPro = async (req, res) =>{
        if(!req.session.username)
            return res.json({"code":3, "message":"please login"})
    
        if(req.session.position !== 0)
            return res.json({"code":5, "message":"Unauthorized"})
    
        if(req.params.idcount){
            let idcount = req.params.idcount
            try{
                let data = await countInput.find({"idcount":idcount}).exec()
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
                let data = await countInput.find({}).exec()
                return res.json({"code":0, "data":data})          
            }
            catch(err){
                return res.json({"code":99, "message":"err query data"})
            }
        }
    }

    //[POST]
    addWh = async (req, res) => {
        if(!req.session.username)
            return res.json({"code":3, "message":"please login"})
    
        if(req.session.position !== 2)
            return res.json({"code":5, "message":"Unauthorized"})
    
        let {idProWH, name, type, qty, priceIn, price} = req.body
        if(idProWH && name && type && qty && price && priceIn){
            if((parseInt(type) === 0 || parseInt(type) === 1 || parseInt(type) === 2) && parseInt(qty) > 0 && parseInt(priceIn) >= 0 && parseInt(price) > 0){
                try{
                    let date = new Date()
                    let dateIn = date.getFullYear().toString() +"-"+ (date.getMonth()+1).toString() +"-"+ date.getDate().toString()
                    let idcount = String(Math.floor(Math.random() * (10000000 - 1000000)) + 100000)
        
                    let data = await WH.find({"name":name}).exec()
                    if (data.length > 0){
                        if(data[0].name !== name)
                            return res.json({"code":11, "message":"name wrong!"})
    
                        let newQty = parseInt(qty) + parseInt(data[0].qty)
                        await WH.updateOne({"idProWH":data[0].idProWH}, {"$set":{"qty":newQty, "price":price, "priceIn":priceIn, "dateIn":dateIn}}).exec()
                            
                        let newCount = new countInput({
                            idcount: idcount,
                            idProWH : idProWH,
                            name : name,
                            qty: qty,
                            priceIn: priceIn,
                            sum : parseInt(qty) * parseInt(priceIn),
                            dateIn: dateIn
                        })
    
                        await newCount.save()
    
                        return res.json({"code":0, "message":"update product in WH succeed"})
                    }
                    else{
                        let newWH = new WH({
                            idProWH : idProWH,
                            name : name,
                            type : type,
                            qty: qty,
                            priceIn: priceIn,
                            price: price,
                            dateIn: dateIn
                        })
    
                        await newWH.save()
         
                        let newCount = new countInput({
                            idcount: idcount,
                            idProWH : idProWH,
                            name : name,
                            qty: qty,
                            priceIn: priceIn,
                            sum : parseInt(qty) * parseInt(priceIn),
                            dateIn: dateIn
                        })
    
                        await newCount.save()
    
                        return res.json({"code":0, "data":newWH})
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
    deleteWH = async (req, res) => {
        if(!req.session.username)
            return res.json({"code":3, "message":"please login"})
    
        if(req.session.position !== 2)
            return res.json({"code":5, "message":"Unauthorized"})
    
        let idProWH = req.body.idProWH
        
        if(idProWH){
            try{
                let data = await WH.find({"idProWH":idProWH}).exec()
                if(data.length){
                    await WH.deleteOne({"idProWH":idProWH}).exec()
                    return res.json({"code":0, "message":"Delete "+ idProWH +" succeed"})
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

    //[UPDATE]
    updatePriceProWH = async (req, res) => {
        if(!req.session.username)
            return res.json({"code":3, "message":"please login"})
    
        if(req.session.position !== 2)
            return res.json({"code":5, "message":"Unauthorized"})
    
        let idProWH = req.body.idProWH
        let price = req.body.price
        
        if(idProWH && price){
            if(parseInt(price) <= 0)
                return res.json({"code":7, "message":"enter wrong"})
            try{
                let data = await WH.find({"idProWH":idProWH}).exec()
                if(data.length){
                    await WH.updateOne({"idProWH":idProWH},{"$set":{"price":price}}).exec()
                    return res.json({"code":0, "message":"Update "+idProWH+" succeed"})
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
module.exports = new ctlApiWH