const customerModel = require('../../../services/models/customer');
const billModel = require('../../../services/models/bill');
const { queryByObject } = require('../../../services/database');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { Logger } = require('../../../services/logger');

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
                    { "idCus": userData.username },
                ],
            };
            billList = await queryByObject(queryObject, billModel);
            if (!billList.length) {
                logger.info('Error: Bill does not existed');
                return res.json({ "code": 6, "message": "id does not exist" });
            }
        } else {
            logger.info('Get all of bill');
            billList = await queryByObject({ "idCus": userData.username }, billModel);
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
        // TODO: refactor - add lib
        if (session.username)
            return res.json({ "code": 4, "message": "you have been login!" });

        const { CMND, password } = req.body;

        if (!CMND || !password)
            return res.json({ "code": 1, "message": "not enough params" });

        const customerInfo = (await queryByObject({ "idCus": CMND }, customerModel))[0];
        const jsonInfo = JSON.stringify(customerInfo);
        logger.info('get customer info', jsonInfo);
        if (customerInfo && bcrypt.compareSync(password, customerInfo.password)) {
            const JWT_SECRET = process.env.JWT_SECRET;
            const salt = Math.floor(Math.random() * 10000) + 1;
            const token = jwt.sign({ username: CMND, salt: salt }, JWT_SECRET, { expiresIn: '1h' });

            const sessionInfo = {
                username: CMND,
                name: customerInfo.name,
                position: 99,
                token: token,
                salt: salt,
            };

            req.session = {
                ...session,
                ...sessionInfo,
            };
            logger.info('Login successfully');
            return res.json({ "code": 0, "user": customerInfo, "token": token });
        }
        logger.info(`Error: username or password is invalid`);
        return res.json({ "code": 2, "message": "username or pass wrong!" });
    }
    catch (error) {
        logger.info('Unexpected error', JSON.stringify(error));
        return res.json({ "code": 99, "message": "err query data" });
    }
}

module.exports = {
    getCustomerBills,
    loginCustomer,
};
