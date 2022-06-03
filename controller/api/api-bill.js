const bills = require('../../models/bills')
class ctlApiBill{
    //[GET]
    //[.../api/getBill/:idBill?]
    getBill = async (req, res) =>{
        if(!req.session.username)
            return res.json({"code":3, "message":"please login"})
    
        if(req.session.position !== 1 && req.session.position !== 0)
            return res.json({"code":5, "message":"Unauthorized"})
    
        if(req.params.idBill){
            try{
                let idBill = req.params.idBill
                let data = await bills.find({"idBill":idBill}).exec()
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
                let data = await bills.find({}).exec()
                return res.json({"code":0, "data":data})
            }
            catch(err){
                return res.json({"code":99, "message":"err query data"})
            }     
        }
    }
}
module.exports = new ctlApiBill