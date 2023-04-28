const TTB = require('../../models/TTB')
const TTB_Br = require('../../models/TTB_Br')

class ctlApiTTB{
    //[GET]
    getTTB = async (req, res) =>{
        if(!req.session.username)
            return res.json({"code":3, "message":"please login"})
    
        if(req.session.position !== 0 && req.session.position !== 2)
            return res.json({"code":5, "message":"Unauthorized"})
    
        if(req.params.idTTB){
            var idTTB = req.params.idTTB
            try{
                let data = await TTB.find({"idTTB":idTTB}).exec()
                if(data.length)
                    return res.json({"code":0, "data":data})
                return res.json({"code":6, "message":"id not exist"})
            }
            catch(err){
                return res.json({"code":99, "message":"err query data"})
            }

        }else{
            try{
                let data = await TTB.find({}).exec()
                return res.json({"code":0, "data":data})          
            }
            catch(err){
                return res.json({"code":99, "message":"err query data"})
            }
            
        }
    }

    getTTB_Broken = async (req, res) =>{
        if(!req.session.username)
            return res.json({"code":3, "message":"please login"})
    
        if(req.session.position !== 0 && req.session.position !== 2)
            return res.json({"code":5, "message":"Unauthorized"})
    
        if(req.params.idTTB_Br){
            var idTTB_Br = req.params.idTTB_Br
            try{
                let data = await TTB_Br.find({"idTTB_Br":idTTB_Br}).exec()  
                if(data.length)
                    return res.json({"code":0, "data":data})
                return res.json({"code":6, "message":"id not exist"})
            }
            catch(err){
                return res.json({"code":99, "message":"err query data"})
            }
            
        }else{
            try{
                let data = await TTB_Br.find({}).exec()
                return res.json({"code":0, "data":data})                   
            }
            catch(err){
                return res.json({"code":99, "message":"err query data"})
            }
        }
    }

    //[POST]
    addTTB = async (req, res) => {
        if(!req.session.username)
            return res.json({"code":3, "message":"please login"})
    
        if(req.session.position !== 2)
            return res.json({"code":5, "message":"Unauthorized"})
    
        let {idTTB,name,qty,priceIn} = req.body
        if(idTTB && name && qty && priceIn){
            if(parseInt(priceIn) >= 0 && parseInt(qty) > 0){
                try{
                    let data = await TTB.find({"name":name}).exec()
                    let date = new Date()
                    let dateIn = date.getFullYear().toString() +"-"+ (date.getMonth()+1).toString() +"-"+ date.getDate().toString()
        
                    if (data.length > 0){
                        if(data[0].name !== name)
                            return res.json({"code":11, "message":"name wrong!"})
    
                        let newQty = parseInt(qty) + parseInt(data[0].qty)
                        await TTB.updateOne({"idTTB":data[0].idTTB}, {"$set":{"qty":newQty,"priceIn":priceIn, "dateIn":dateIn}}).exec()
                        
                        return res.json({"code":0, "message":"update product in WH succeed"})
                    }
                    else{
                        let newTTB = new TTB({
                            idTTB : idTTB,
                            name : name,
                            qty: qty,
                            priceIn: priceIn,
                            dateIn : dateIn
                        })
    
                        await newTTB.save()
                        return res.json({"code":0, "data":newTTB})
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

    //[UPDATE]
    updateTTB_broken = async (req, res) => {
        if(!req.session.username)
            return res.json({"code":3, "message":"please login"})
    
        if(req.session.position !== 2)
            return res.json({"code":5, "message":"Unauthorized"})
    
        let {idTTB,qty} = req.body
    
        if(idTTB && qty){
            if(parseInt(qty) > 0){
                try{
                    let data = await TTB.find({"idTTB":idTTB}).exec()
                    if(data.length){
                        if(parseInt(data[0].qty) < parseInt(qty))
                            return res.json({"code":10, "message":"quantity only: " + data[0].qty})
    
                        let qty_new = parseInt(data[0].qty) - parseInt(qty)
                        await TTB.updateOne({"idTTB":idTTB},{"$set":{"qty":qty_new}}).exec()
    
                        let date = new Date();
                        let dateIn = date.getFullYear().toString() +"-"+ (date.getMonth()+1).toString() +"-"+ date.getDate().toString()
    
                        let idTTB_Br = String(Math.floor(Math.random() * (10000000 - 1000000)) + 100000)
                        let newTTB_Br = new TTB_Br({
                            idTTB_Br : idTTB_Br,
                            idTTB : idTTB,
                            name : data[0].name,
                            qty: qty,
                            priceIn: data[0].priceIn,
                            dateIn : dateIn
                        })
    
                        await newTTB_Br.save()
                        return res.json({"code":0, "message":"Update "+idTTB+" succeed"})
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
                return res.json({"code":7, "message":"enter wrong"})
        }
        else
            return res.json({"code":1, "message":"not enough params"})
    }
}
module.exports = new ctlApiTTB