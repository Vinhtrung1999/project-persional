const staffs = require('../../models/staffs')
const svds = require('../../models/svds')
const products = require('../../models/products')
const bills = require('../../models/bills')
const customers = require('../../models/customers')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const validator = require("email-validator")

class ctlApiStaff{
    //[GET]
    getStaffs = async (req, res) =>{
        if(!req.session.username)
            return res.json({"code":3, "message":"please login"})
    
        if(req.session.position !== 0)
            return res.json({"code":5, "message":"Unauthorized"})
    
        if(req.params.idStaff){
            let idStaff = req.params.idStaff
            try{
                let data = await staffs.find({"idStaff":idStaff}).exec()

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
                let data = await staffs.find({}).exec()
                return res.json({"code":0, "data":data})  
            }
            catch(err){
                return res.json({"code":99, "message":"err query data"})
            }
        }
    }

    getCus = async (req, res) =>{
        if(!req.session.username)
            return res.json({"code":3, "message":"please login"})
    
        if(req.session.position !== 1)
            return res.json({"code":5, "message":"Unauthorized"})
    
        if(req.params.idCus){
            let idCus = req.params.idCus
            try{
                let data = await customers.find({"idCus":idCus}).exec()
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
                let data = await customers.find({}).exec()
                return res.json({"code":0, "data":data})          
            }
            catch(err){
                return res.json({"code":99, "message":"err query data"})
            }
        }
    }

    getProfileAPI = async (req, res) =>{
        if(!req.session.username)
            return res.json({"code":3, "message":"please login"})
    
        if(req.session.position !== 0 && req.session.position !== 1 && req.session.position !== 2)
            return res.json({"code":5, "message":"Unauthorized"})
        
        try{
            let data = await staffs.find({"idStaff":req.session.username}).exec()
            return res.json({"code":0, "data":data})          
        }
        catch(err){
            return res.json({"code":99, "message":"err query data"})
        }        
    }

    logout = (req, res)=>{
        if(!req.session.username)
            return res.json({"code":3, "message":"please login"})
    
        req.session.destroy()
        return res.json({"code":0, "message":"logout succeed"})
    }

    //[POST]
    login = async (req, res) =>{
        if(req.session.username)
            return res.json({"code":4, "message":"you have been login!"})
    
        let {username, password} = req.body
    
        if (!username || !password)
            return res.json({"code":1, "message":"not enough params"})
        
        try{
            let data = await staffs.find({"idStaff":username}).exec()
                    
            if (data.length && bcrypt.compareSync(password, data[0].password)){
                req.session.username = username
                req.session.name = data[0].name
                req.session.position = data[0].position
    
                const JWT_SECRET = process.env.JWT_SECRET
                let salt = Math.floor(Math.random() * 10000) + 1
                let token = jwt.sign({username:username, salt:salt}, JWT_SECRET, { expiresIn: '1h' })  
                req.session.token = token
                req.session.salt = salt
                return res.json({"code":0, "user":data, "token":token})
            }   
            return res.json({"code":2, "message":"username or pass wrong!"})     
        }
        catch(err){
            return res.json({"code":99, "message":"err query data"})
        }
        
    }

    addStaff = async (req, res) => {
        if(!req.session.username)
            return res.json({"code":3, "message":"please login"})
    
        if(req.session.position !== 0)
            return res.json({"code":5, "message":"Unauthorized"})
    
        let {idStaff,password,name, gender,age,salary,shift,position} = req.body
        if(idStaff && password && name && gender && age && salary && shift && position){
            if(!isNaN(parseInt(age)) && !isNaN(parseInt(gender)) && !isNaN(parseInt(position)) && !isNaN(parseInt(salary))){
                if((parseInt(gender) === 0 || parseInt(gender) === 1) && (parseInt(position) === 0 || parseInt(position) === 1 || parseInt(position) === 2) && parseInt(salary) > 0){
                    try{
                        let data = await staffs.find({"idStaff":idStaff}).exec()                
                        if (data.length > 0)
                            return res.json({"code":8, "message":"id existed, please try again"})

                        let newStaff = new staffs({
                            idStaff : idStaff,
                            password : bcrypt.hashSync(password, 10),
                            name : name,
                            gender : gender,
                            age : age,
                            salary: salary,
                            shift: shift,
                            position: position
                        })
                
                        await newStaff.save()
                        return res.json({"code":0, "message":"add staff "+idStaff+" succeed"})                  
                    }
                    catch(err){
                        return res.json({"code":99, "message":"err query data"})
                    }
                }
                else
                    return res.json({"code":7, "message":"enter wrong"})
            }
            else
                return res.json({"code":7, "message":"enter wrong"})
        }
        else
            return res.json({"code":1, "message":"not enough params"})
    }

    changePass = async (req, res)=>{
        if(!req.session.username)
            return res.json({"code":3, "message":"please login"})
    
        let password = req.body.password
        if(!password)
            return res.json({"code":1, "message":"not enough params"})
        
        try{
            await staffs.updateOne({"idStaff":req.session.username}, {$set: {"password": bcrypt.hashSync(password, 10)}}).exec()
            return res.json({"code":0, "message":"change password succeed"})
        }
        catch(err){
            return res.json({"code":99, "message":"err query data"})
        }
                 
    }

    pay = async (req, res)=>{
        if(!req.session.username)
            return res.json({"code":3, "message":"please login"})
    
        if(req.session.position !== 1)
            return res.json({"code":5, "message":"Unauthorized"})
        
        let {idBill, idCus, listSvd, listProducts, sum, dateUse, dateOrder} = req.body
    
        if(idBill && listSvd && idCus && sum && dateUse && dateOrder){
            try{

                if(listProducts.length == 0 && listSvd.length == 0)
                    return res.json({"code":1, "message":"not params"})
        
                if(isNaN(sum) || parseInt(sum) <= 0)
                    return res.json({"code":7, "message":"enter wrong"})
        
                listProducts.forEach(val =>{
                    if(val.qty <= 0)
                        return res.json({"code":7, "message":"enter wrong"})
                })    
                let convertDateOrder = new Date(dateOrder);
                let convertDateUse = new Date(dateUse);
        
                if(convertDateOrder > convertDateUse)
                    return res.json({"code":9, "message":"date past"})
                
                let flagSvd = 1
                listSvd.forEach(val => {
                    svds.find({"idSvd":val.idSvd})
                    .then(data => {
                        if(!data.length || data[0].status === 1)
                            flagSvd = 0
                    })
                    .catch(err => console.log(err))
                })
        
                setTimeout(() => {
                    if(flagSvd === 0)
                        return res.json({"code":6, "message":"id not exist or svd ordered"}) 
                
                    let flag_product = 1
                    listProducts.forEach(val => {
                        products.find({"idPro":val.idPro})
                        .then(pro => {
                            if(!pro.length)
                                flag_product = 0
                            if(parseInt(pro[0].qty) < parseInt(val.qty))
                                flag_product = 0
                        })
                        .catch(err => console.log(err))
                    })
                    setTimeout(async () => {
                        if(flag_product === 0)
                            return res.json({"code":10, "message":"id product not exist or not enough quantity"})
        
                        let dataBill = await bills.find({"idBill":idBill}).exec()
                        if(dataBill.length)
                            return res.json({"code":8, "message":"id existed"})
                        
                        let dataCus = await customers.find({"idCus":idCus}).exec()     
                        if(!dataCus.length)
                            return res.json({"code":6, "message":"id not exist"})
    
                        let newBill = new bills({
                            idBill :idBill,
                            idCus: idCus,
                            idStaff: req.session.username,
                            listSvd: listSvd,
                            listProducts: listProducts,
                            sum: sum,
                            dateUse: dateUse,
                            dateOrder: dateOrder
                        })
                
                        await newBill.save()

                        for (const val of listSvd) {
                            await svds.updateOne({"idSvd":val.idSvd}, {"$set":{"status":1}}).exec()
                        }
            
                        for (const pro of listProducts) {
                            let dataPro = await products.find({"idPro":pro.idPro}).exec()
                            let newQty = parseInt(dataPro[0].qty) - parseInt(pro.qty)
                            await products.updateOne({"idPro":pro.idPro}, {"$set":{"qty":newQty}}).exec() 
                        }
                        return res.json({"code":0, "bill":newBill})
                    },1000)
        
                }, 1000)
                
            }
            catch(err){
                return res.json({"code":99, "message":"err query data"})
            }
        }
        else
            return res.json({"code":1, "message":"not enough params"})  
    }

    resetPass = async (req, res)=>{
        if(!req.session.username)
            return res.json({"code":3, "message":"please login"})
    
        if(req.session.position !== 0)
            return res.json({"code":5, "message":"Unauthorized"})
    
        let {idStaff,password} = req.body
    
        if(!password || !idStaff)
            return res.json({"code":1, "message":"not enough params"})
        
        try{
            await staffs.updateOne({"idStaff":idStaff}, {$set: {"password": bcrypt.hashSync(password, 10)}}).exec()
            return res.json({"code":0, "message":"change password succeed"})            
        }
        catch(err){
            return res.json({"code":99, "message":"err query data"})
        }
    }

    addCustomers = async (req, res) => {
        if(!req.session.username)
            return res.json({"code":3, "message":"please login"})
    
        if(req.session.position !== 1)
            return res.json({"code":5, "message":"Unauthorized"})
    
        let {name,gender,CMND,phone,email} = req.body
        if(name && CMND && phone && email){
            if((parseInt(gender) === 0 || parseInt(gender) === 1) && validator.validate(email)){
                try{
                    let idCus = String(CMND)
                    let data = await customers.find({"idCus":idCus}).exec()
                    if (data.length > 0)
                        return res.json({"code":8, "message":"id existed, please try again"})
                    
                    let newCus = new customers({
                        idCus : idCus,
                        password : bcrypt.hashSync(idCus, 10),
                        name : name,
                        gender : gender,
                        CMND: CMND,
                        phone: phone,
                        email:email
                    })
                    
                    await newCus.save()

                    return res.json({"code":0, customers:newCus})
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
    updateStaff = async (req, res) => {
        if(!req.session.username)
            return res.json({"code":3, "message":"please login"})
    
        if(req.session.position !== 0)
            return res.json({"code":5, "message":"Unauthorized"})
    
        let {idStaff, shift, salary, position} = req.body
    
        if(idStaff && shift && salary && position){
            if((parseInt(position) === 0 || parseInt(position) === 1 || parseInt(position) === 2) && parseInt(salary) > 0){
                try{
                    let data = await staffs.find({"idStaff":idStaff}).exec()
                    if(data.length){
                        await staffs.updateOne({"idStaff":idStaff},{"$set":{"shift":shift, "position":position, "salary":salary}}).exec()
                        return res.json({"code":0, "message":"Update "+idStaff+" succeed"})
                    }
                    else{
                        return res.json({"code":6, "message":"id not exist"})
                    }
                }
                catch(err){
                    return res.json({"code":99, "message":"err query data"})
                }
                
            }
            else{
                return res.json({"code":7, "message":"enter wrong"})
            }
        }
        else
            return res.json({"code":1, "message":"not enough params"})
    }

    //[DELETE]
    deleteStaff = async (req, res) => {
        if(!req.session.username)
            return res.json({"code":3, "message":"please login"})
    
        if(req.session.position !== 0)
            return res.json({"code":5, "message":"Unauthorized"})
    
        let idStaff = req.body.idStaff
        
        if(idStaff){
            try{
                let data = await staffs.find({"idStaff":idStaff}).exec()
                if(data.length){
                    await staffs.deleteOne({"idStaff":idStaff}).exec()
                    return res.json({"code":0, "message":"Delete "+idStaff+" succeed"})
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
module.exports = new ctlApiStaff