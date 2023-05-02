const staffModel = require('../../../services/models/staff');
const stadiumModel = require('../../../services/models/stadium');
const productModel = require('../../../services/models/product');
const billModel = require('../../../services/models/bill');
const customerModel = require('../../../services/models/customer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {
    queryByObject,
    updateByObject,
    deleteByObject,
} = require('../../../services/database');
const {
    validateAddStaff,
    validatePayment,
    validateUpdateStaff,
    validateAddCustomer,
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

        const staffProfile = (await queryByObject({ "idStaff": username }, staffModel))[0];
        if (!(staffProfile && bcrypt.compareSync(password, staffProfile.password))) {
            return res.json({ 'code': 2, 'message': 'username or pass wrong!' })
        }

        const JWT_SECRET = process.env.JWT_SECRET;
        const salt = Math.floor(Math.random() * 10000) + 1;
        const token = jwt.sign({ username, salt }, JWT_SECRET, { expiresIn: '1h' });

        req.session.username = username;
        req.session.name = staffProfile.name;
        req.session.position = staffProfile.position;
        req.session.token = token;
        req.session.salt = salt;

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

        const staffInfo = (await queryByObject({ "idStaff": staffInput.idStaff }, staffModel))[0];
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
    try {
        const session = req.session
        if (!session.username)
            return res.json({ "code": 3, "message": "please login" });

        let password = req.body.password
        if (!password)
            return res.json({ "code": 1, "message": "not enough params" });


        const updateObject = {
            password: bcrypt.hashSync(password, 10),
        };
        await updateByObject({ $set: updateObject }, staffModel, { "idStaff": session.username });
        return res.json({ "code": 0, "message": "Change password successfully" });
    }
    catch (err) {
        return res.json({ "code": 99, "message": "err query data" });
    }

}

const pay = async (req, res) => {
    try {
        const session = req.session;
        if (!session.username)
            return res.json({ "code": 3, "message": "please login" });

        if (session.position !== 1)
            return res.json({ "code": 5, "message": "Unauthorized" });

        const billInput = req.body;
        const billValidation = validatePayment(billInput);
        if (!billValidation) {
            return res.json({
                code: 1,
                message: 'Fail to validate',
            });
        }

        const productList = billInput.listProducts;
        const stadiumList = billInput.listSvd;

        const productNonQty = productList.find(product => product.qty <= 0);
        if (productNonQty) {
            return res.json({
                code: 1,
                message: 'Fail to validate',
            });
        }
        const convertDateOrder = new Date(billInput.dateOrder);
        const convertDateUse = new Date(billInput.dateUse);

        if (convertDateOrder > convertDateUse) {
            return res.json({
                code: 1,
                message: 'Fail to validate dateTime',
            });
        }

        let stadiumInfo;
        const getStadiumList = [];
        for (const stadium of stadiumList) {
            stadiumInfo = (await queryByObject({ "idSvd": stadium.idSvd }, stadiumModel))[0];
            if (!stadiumInfo) {
                return res.json({
                    code: 1,
                    message: `Stadium - ${stadium.idSvd} does not existed`,
                });
            }

            if (stadiumInfo.status === 1) {
                return res.json({
                    code: 1,
                    message: `Stadium - ${stadium.idSvd} is ordered`,
                });
            }

            getStadiumList.push(stadiumInfo);
        }

        let productInfo;
        let qtySubtraction;
        const getProductList = [];
        const qtySubtractionList = [];
        for (const product of productList) {
            productInfo = (await queryByObject({ "idPro": product.idPro }, productModel))[0];
            if (!productInfo) {
                return res.json({
                    code: 1,
                    message: `Product - ${product.idPro} does not existed`,
                });
            }
            qtySubtraction = parseInt(productInfo.qty) - parseInt(product.qty);
            if (qtySubtraction < 0) {
                return res.json({
                    code: 1,
                    message: '`Product - ${product.idPro} does not enough quantity`',
                });
            }

            qtySubtractionList.push({
                idProduct: product.idPro,
                qty: qtySubtraction,
            })
            getProductList.push(productInfo);
        }

        const billData = (await queryByObject({ "idBill": billInput.idBill }, billModel))[0];
        if (billData)
            return res.json({ "code": 8, "message": "Bill existed" })

        let customerData = (await queryByObject({ "idCus": billInput.idCus }, customerModel))[0];
        if (customerData)
            return res.json({ "code": 6, "message": "Customer does not exist" })

        const billObject = {
            ...billInput,
            listSvd: getStadiumList,
            listProducts: getProductList,
            idStaff: session.username,
        };

        await (new billModel(billObject)).save();
        for (const st of getStadiumList) {
            await updateByObject({ idSvd: st.idSvd }, stadiumModel, { '$set': { status: 1 } });
        }

        for (const qtySubtraction of qtySubtractionList) {
            await updateByObject({ idPro: pro.idPro }, productModel, { '$set': { qty: qtySubtraction.qty } });
        }
        return res.json({
            code: 0,
            bill: billObject,
        });
    }
    catch (err) {
        return res.json({ "code": 99, "message": "err query data" })
    }
}

const resetPass = async (req, res) => {
    try {
        const session = req.session;
        if (!session.username)
            return res.json({ "code": 3, "message": "please login" });

        if (session.position !== 0)
            return res.json({ "code": 5, "message": "Unauthorized" });

        let { idStaff, password } = req.body;

        if (!password || !idStaff)
            return res.json({ "code": 1, "message": "not enough params" });

        const updateObject = {
            password: bcrypt.hashSync(password, 10),
        };

        await updateByObject({ "idStaff": idStaff }, staffModel, { $set: updateObject });
        return res.json({
            code: 0,
            message: 'Change password successfully',
        });
    }
    catch (err) {
        return res.json({ "code": 99, "message": "err query data" });
    }
}

const addCustomer = async (req, res) => {
    try {
        const session = req.session;
        if (!session.username)
            return res.json({ "code": 3, "message": "please login" });

        if (session.position !== 1)
            return res.json({ "code": 5, "message": "Unauthorized" });

        const customerInput = req.body;
        const customerValidation = validateAddCustomer(customerInput);
        if (!customerValidation) {
            return res.json({
                code: 1,
                message: 'Fail to validate',
            })
        }

        const idCustomer = String(CMND);
        const customerData = (await queryByObject({ "idCus": idCustomer }, customerModel))[0];
        if (customerData)
            return res.json({ "code": 8, "message": "Customer existed" });

        let newCustomerObject = {
            idCus: idCustomer,
            password: bcrypt.hashSync(idCustomer, 10),
            ...customerInput,
        }

        await (new customerModel(newCustomerObject)).save();

        return res.json({
            code: 0,
            customers: newCustomerObject,
        })
    }
    catch (err) {
        return res.json({ "code": 99, "message": "err query data" })
    }
}

const updateStaff = async (req, res) => {
    try {
        const session = req.session;
        if (!session.username)
            return res.json({ "code": 3, "message": "please login" });

        if (session.position !== 0)
            return res.json({ "code": 5, "message": "Unauthorized" });

        const staffInput = req.body;
        const staffValidation = validateUpdateStaff(staffInput);
        if (!staffValidation) {
            return res.json({
                code: 1,
                message: 'Fail to validate',
            });
        }


        const staffInfo = (await queryByObject({ "idStaff": staffInput.idStaff }))[0];
        if (!staffInfo) {
            return res.json({ "code": 6, "message": "id not exist" })
        }
        const updateObject = {
            shift,
            position,
            salary,
        }
        await updateByObject({ "idStaff": idStaff }, staffModel, { "$set": updateObject });
        return res.json({
            code: 0,
            message: `staff - ${staffInput.idStaff} is updated successfully`,
        });
    }
    catch (err) {
        return res.json({ "code": 99, "message": "err query data" })
    }
}

const deleteStaff = async (req, res) => {
    try {
        const session = req.session;
        if (!session.username)
            return res.json({ "code": 3, "message": "please login" });

        if (session.position !== 0)
            return res.json({ "code": 5, "message": "Unauthorized" });

        const idStaff = req.body.idStaff || '';

        let staffInfo = (await queryByObject({ "idStaff": idStaff }, staffModel))[0];
        if (!staffInfo) {
            return res.json({ "code": 6, "message": "id not exist" });
        }
        await deleteByObject(staffModel, { "idStaff": idStaff });
        return res.json({
            code: 0,
            message: `Delete staff - ${idStaff} successfully`,
        });
    } catch (err) {
        return res.json({ "code": 99, "message": "err query data" })
    }
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
