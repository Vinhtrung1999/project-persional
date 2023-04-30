const staffModel = require('../../../services/models/staff');
const stadiumModel = require('../../../services/models/stadium');
const productModel = require('../../../services/models/product');
const billModel = require('../../../services/models/bill');
const customerModel = require('../../../services/models/customer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('email-validator');
const {
    queryByObject,
    updateByObject,
    deleteByObject,
} = require('../../../services/database');
const {
    validateAddStaff,
} = require('./api-staff-validation');

const getStaff = async (req, res) => {
    try {
        const session = req.session;
        if (!session.username)
            return res.json({ "code": 3, "message": "please login" });

        if (session.position !== 0)
            return res.json({ "code": 5, "message": "Unauthorized" });

        let staffData;
        const idStaff = req.params.idStaff;
        if (idStaff) {
            staffData = await queryByObject({ "idStaff": idStaff }, staffModel);

            if (!staffData.length)
                return res.json({ "code": 6, "message": "id not exist" });
        }
        else {
            staffData = await queryByObject({}, staffModel);
        }
        return res.json({ "code": 0, "data": staffData });
    } catch (err) {
        return res.json({ "code": 99, "message": "err query data" });
    }
}

const getCustomer = async (req, res) => {
    try {
        const session = req.session;
        if (!session.username)
            return res.json({ 'code': 3, 'message': 'please login' });

        if (session.position !== 1)
            return res.json({ 'code': 5, 'message': 'Unauthorized' });

        let customerData;
        const idCustomer = req.params.idCus;
        if (idCustomer) {
            customerData = await queryByObject({ 'idCus': idCustomer }, customerModel);
            if (!customerData.length)
                return res.json({ 'code': 6, 'message': 'id not exist' });
        }
        else {
            customerData = await queryByObject({}, customerModel);
        }
        return res.json({ 'code': 0, 'data': customerData });
    } catch (err) {
        return res.json({ 'code': 99, 'message': 'err query data' });
    }
}

const getProfile = async (req, res) => {
    try {
        const session = req.session;
        if (!session.username)
            return res.json({ 'code': 3, 'message': 'please login' });

        if (session.position !== 0
            && session.position !== 1
            && session.position !== 2)
            return res.json({ 'code': 5, 'message': 'Unauthorized' });


        const profile = await queryByObject({ 'idStaff': session.username }, staffModel);
        return res.json({ 'code': 0, 'data': profile });
    }
    catch (err) {
        return res.json({ 'code': 99, 'message': 'err query data' });
    }
}

const logout = (req, res) => {
    const session = req.session;
    if (!session.username)
        return res.json({ "code": 3, "message": "please login" });

    session.destroy();
    return res.json({ "code": 0, "message": "logout succeed" });
}

const login = async (req, res) => {
    try {
        const session = req.session;
        if (session.username)
            return res.json({ "code": 4, "message": "you have been login!" });

        let { username, password } = req.body;

        if (!username || !password)
            return res.json({ "code": 1, "message": "not enough params" });

        const staffProfile = await queryByObject({ "idStaff": username }, staffModel)[0];
        if (!(staffProfile && bcrypt.compareSync(password, staffProfile.password))) {
            return res.json({ 'code': 2, 'message': 'username or pass wrong!' })
        }

        const JWT_SECRET = process.env.JWT_SECRET;
        const salt = Math.floor(Math.random() * 10000) + 1;
        const token = jwt.sign({ username, salt }, JWT_SECRET, { expiresIn: '1h' });
        const sessionInfo = {
            username = username,
            name = staffProfile.name,
            position = staffProfile.position,
            token = token,
            salt = salt,
        };
        req.session = {
            ...session,
            ...sessionInfo,
        };

        return res.json({ 'code': 0, 'user': staffProfile, 'token': token })
    }
    catch (err) {
        return res.json({ "code": 99, "message": "err query data" })
    }

}

const addStaff = async (req, res) => {
    try {
        const session = req.session;
        if (!session.username)
            return res.json({ "code": 3, "message": "please login" });

        if (session.position !== 0)
            return res.json({ "code": 5, "message": "Unauthorized" });

        const staffInput = req.body;
        const staffValidation = validateAddStaff(staffInput);
        if (!staffValidation) {
            return res.json({
                code: 0,
                message: 'fail to validate',
            })
        }

        const staffInfo = await queryByObject({ "idStaff": staffInput.idStaff }, staffModel)[0];
        if (staffInfo)
            return res.json({ "code": 8, "message": "id existed, please try again" });

        const hashPwd = bcrypt.hashSync(staffInput.password, 10);
        let newStaff = {
            ...staffInput,
            password: hashPwd,
        };

        await (new staffModel(newStaff)).save();
        return res.json({
            code: 0,
            message: `Add staff ${newStaff.idStaff} successfully`,
        });
    }
    catch (err) {
        return res.json({ "code": 99, "message": "err query data" });
    }
}

const changePass = async (req, res) => {
    if (!req.session.username)
        return res.json({ "code": 3, "message": "please login" })

    let password = req.body.password
    if (!password)
        return res.json({ "code": 1, "message": "not enough params" })

    try {
        await staffs.updateOne({ "idStaff": req.session.username }, { $set: { "password": bcrypt.hashSync(password, 10) } }).exec()
        return res.json({ "code": 0, "message": "change password succeed" })
    }
    catch (err) {
        return res.json({ "code": 99, "message": "err query data" })
    }

}

const pay = async (req, res) => {
    if (!req.session.username)
        return res.json({ "code": 3, "message": "please login" })

    if (req.session.position !== 1)
        return res.json({ "code": 5, "message": "Unauthorized" })

    let { idBill, idCus, listSvd, listProducts, sum, dateUse, dateOrder } = req.body

    if (idBill && listSvd && idCus && sum && dateUse && dateOrder) {
        try {

            if (listProducts.length == 0 && listSvd.length == 0)
                return res.json({ "code": 1, "message": "not params" })

            if (isNaN(sum) || parseInt(sum) <= 0)
                return res.json({ "code": 7, "message": "enter wrong" })

            listProducts.forEach(val => {
                if (val.qty <= 0)
                    return res.json({ "code": 7, "message": "enter wrong" })
            })
            let convertDateOrder = new Date(dateOrder);
            let convertDateUse = new Date(dateUse);

            if (convertDateOrder > convertDateUse)
                return res.json({ "code": 9, "message": "date past" })

            let flagSvd = 1
            listSvd.forEach(val => {
                svds.find({ "idSvd": val.idSvd })
                    .then(data => {
                        if (!data.length || data[0].status === 1)
                            flagSvd = 0
                    })
                    .catch(err => console.log(err))
            })

            setTimeout(() => {
                if (flagSvd === 0)
                    return res.json({ "code": 6, "message": "id not exist or svd ordered" })

                let flag_product = 1
                listProducts.forEach(val => {
                    products.find({ "idPro": val.idPro })
                        .then(pro => {
                            if (!pro.length)
                                flag_product = 0
                            if (parseInt(pro[0].qty) < parseInt(val.qty))
                                flag_product = 0
                        })
                        .catch(err => console.log(err))
                })
                setTimeout(async () => {
                    if (flag_product === 0)
                        return res.json({ "code": 10, "message": "id product not exist or not enough quantity" })

                    let dataBill = await bills.find({ "idBill": idBill }).exec()
                    if (dataBill.length)
                        return res.json({ "code": 8, "message": "id existed" })

                    let dataCus = await customers.find({ "idCus": idCus }).exec()
                    if (!dataCus.length)
                        return res.json({ "code": 6, "message": "id not exist" })

                    let newBill = new bills({
                        idBill: idBill,
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
                        await svds.updateOne({ "idSvd": val.idSvd }, { "$set": { "status": 1 } }).exec()
                    }

                    for (const pro of listProducts) {
                        let dataPro = await products.find({ "idPro": pro.idPro }).exec()
                        let newQty = parseInt(dataPro[0].qty) - parseInt(pro.qty)
                        await products.updateOne({ "idPro": pro.idPro }, { "$set": { "qty": newQty } }).exec()
                    }
                    return res.json({ "code": 0, "bill": newBill })
                }, 1000)

            }, 1000)

        }
        catch (err) {
            return res.json({ "code": 99, "message": "err query data" })
        }
    }
    else
        return res.json({ "code": 1, "message": "not enough params" })
}

const resetPass = async (req, res) => {
    if (!req.session.username)
        return res.json({ "code": 3, "message": "please login" })

    if (req.session.position !== 0)
        return res.json({ "code": 5, "message": "Unauthorized" })

    let { idStaff, password } = req.body

    if (!password || !idStaff)
        return res.json({ "code": 1, "message": "not enough params" })

    try {
        await staffs.updateOne({ "idStaff": idStaff }, { $set: { "password": bcrypt.hashSync(password, 10) } }).exec()
        return res.json({ "code": 0, "message": "change password succeed" })
    }
    catch (err) {
        return res.json({ "code": 99, "message": "err query data" })
    }
}

const addCustomer = async (req, res) => {
    if (!req.session.username)
        return res.json({ "code": 3, "message": "please login" })

    if (req.session.position !== 1)
        return res.json({ "code": 5, "message": "Unauthorized" })

    let { name, gender, CMND, phone, email } = req.body
    if (name && CMND && phone && email) {
        if ((parseInt(gender) === 0 || parseInt(gender) === 1) && validator.validate(email)) {
            try {
                let idCus = String(CMND)
                let data = await customers.find({ "idCus": idCus }).exec()
                if (data.length > 0)
                    return res.json({ "code": 8, "message": "id existed, please try again" })

                let newCus = new customers({
                    idCus: idCus,
                    password: bcrypt.hashSync(idCus, 10),
                    name: name,
                    gender: gender,
                    CMND: CMND,
                    phone: phone,
                    email: email
                })

                await newCus.save()

                return res.json({ "code": 0, customers: newCus })
            }
            catch (err) {
                return res.json({ "code": 99, "message": "err query data" })
            }
        }
        else
            return res.json({ "code": 7, "message": "enter wrong" })
    }
    else
        return res.json({ "code": 1, "message": "not enough params" })
}

//[UPDATE]
const updateStaff = async (req, res) => {
    if (!req.session.username)
        return res.json({ "code": 3, "message": "please login" })

    if (req.session.position !== 0)
        return res.json({ "code": 5, "message": "Unauthorized" })

    let { idStaff, shift, salary, position } = req.body

    if (idStaff && shift && salary && position) {
        if ((parseInt(position) === 0 || parseInt(position) === 1 || parseInt(position) === 2) && parseInt(salary) > 0) {
            try {
                let data = await staffs.find({ "idStaff": idStaff }).exec()
                if (data.length) {
                    await staffs.updateOne({ "idStaff": idStaff }, { "$set": { "shift": shift, "position": position, "salary": salary } }).exec()
                    return res.json({ "code": 0, "message": "Update " + idStaff + " succeed" })
                }
                else {
                    return res.json({ "code": 6, "message": "id not exist" })
                }
            }
            catch (err) {
                return res.json({ "code": 99, "message": "err query data" })
            }

        }
        else {
            return res.json({ "code": 7, "message": "enter wrong" })
        }
    }
    else
        return res.json({ "code": 1, "message": "not enough params" })
}

//[DELETE]
const deleteStaff = async (req, res) => {
    if (!req.session.username)
        return res.json({ "code": 3, "message": "please login" })

    if (req.session.position !== 0)
        return res.json({ "code": 5, "message": "Unauthorized" })

    let idStaff = req.body.idStaff

    if (idStaff) {
        try {
            let data = await staffs.find({ "idStaff": idStaff }).exec()
            if (data.length) {
                await staffs.deleteOne({ "idStaff": idStaff }).exec()
                return res.json({ "code": 0, "message": "Delete " + idStaff + " succeed" })
            }
            else {
                return res.json({ "code": 6, "message": "id not exist" })
            }
        }
        catch (err) {
            return res.json({ "code": 99, "message": "err query data" })
        }
    }
    else
        return res.json({ "code": 1, "message": "not enough params" })
}

module.exports = {
    getStaff,
    getCustomer,
    getProfile,
    logout,
    login,
    addStaff,
    changePass,
    resetPass,
    pay,
    addCustomer,
    updateStaff,
    deleteStaff,
};
