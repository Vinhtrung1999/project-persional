const customerModel = require('../../../services/models/customer');
const billModel = require('../../../services/models/bill');
const { queryByObject } = require('../../../services/database');
const bcrypt = require('bcrypt')
const { Logger } = require('../../../services/logger');
const { generateToken } = require('../../../services/token');

const getCustomerBills = async (req, res) => {
    try {
        const logger = new Logger('Start get customer bills');
        const userData = req.user;

        let billList;
        const { idBill } = req.params;
        if (idBill) {
            logger.info('Get bill with id', idBill);
            const queryObject = {
                "$and": [
                    { "idBill": idBill },
                    { "idCus": userData.idCus },
                ],
            };
            billList = await queryByObject(queryObject, billModel);
            if (!billList.length) {
                logger.info('Error: Bill does not existed');
                return res.json({ "code": 6, "message": "id does not exist" });
            }
        } else {
            logger.info('Get all of bill');
            billList = await queryByObject({ "idCus": userData.idCus }, billModel);
        }
        logger.info('Get bill successfully', JSON.stringify(billList));
        return res.json({ "code": 0, "data": billList });
    } catch (err) {
        logger.info('Unexpected error', JSON.stringify(err));
        return res.json({ "code": 99, "message": "err query data" });
    }
}

// TODO: re-code
const loginCustomer = async (req, res) => {
    try {
        const logger = new Logger('Start login customer');
        const session = req.session;

        const { CMND, password } = req.body;

        if (!CMND || !password)
            return res.json({ "code": 1, "message": "not enough params" });

        const customerInfo = (await queryByObject({ "idCus": CMND }, customerModel))[0];
        logger.info('get customer info', JSON.stringify(customerInfo));
        if (customerInfo && bcrypt.compareSync(password, customerInfo.password)) {
            const customerData = {
                ...customerInfo.toObject(),
                password: '******',
            }
            const JWT_SECRET = process.env.JWT_SECRET;
            const token = generateToken(customerData, JWT_SECRET, '1h');

            logger.info('Login successfully');
            return res.json({ "code": 0, "user": customerData, "token": token });
        }
        logger.info(`Error: username or password is invalid`);
        return res.json({ "code": 2, "message": "username or pass wrong!" });
    }
    catch (error) {
        logger.info('Unexpected error', JSON.stringify(error));
        return res.json({ "code": 99, "message": "err query data" });
    }
}

const customerProfile = async (req, res) => {
    try {
        const idCustomer = req.user.idCus;
        if (!idCustomer) {
            return res.json({ code: 1, message: 'not enough params' });
        }

        const customerInfo = (await queryByObject({ idCus: idCustomer }, customerModel))[0];
        if (!customerInfo) {
            return res.json({ code: 1, message: 'customer does not exist' });
        }
        return res.json({
            code: 0,
            data: customerInfo,
        });
    } catch (error) {
        return res.json({
            code: 1,
            message: 'Error while get customer profile',
        });
    }
}

module.exports = {
    getCustomerBills,
    loginCustomer,
    customerProfile,
};
