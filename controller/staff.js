const staffs = require('../models/staffs')
class ctlStaff{
    //[GET]
    getStaffs = (req, res) =>{
        if(!req.session.username)
            return res.json({"code":3, "message":"please login"})
    
        if(req.session.position !== 0)
            return res.json({"code":5, "message":"Unauthorized"})
    
        if(req.params.idStaff){
            var idStaff = req.params.idStaff
            
            staffs.find({"idStaff":idStaff}).exec((err, data) =>{
                if(err)
                    return res.json({"code":99, "message":"err query data"})
                
                if(data.length)
                    return res.json({"code":0, "data":data})
                return res.json({"code":6, "message":"id not exist"})
            })
        }else{
            staffs.find({}).exec((err, data) =>{
                if(err)
                    return res.json({"code":99, "message":"err query data"})
                return res.json({"code":0, "data":data})          
            })
        }
    }

    //[POST]
}

module.exports = new ctlStaff