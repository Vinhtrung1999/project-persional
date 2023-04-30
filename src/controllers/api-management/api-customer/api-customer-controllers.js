const customerModel = require('../../../services/models/customer');
const billModel = require('../../../services/models/bill');
const { queryByObject } = require('../../../services/database');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const getCustomerBills = async (req, res) => {
    try {
        const session = req.session;
        // TODO: refactor -- add lib
        if (!session.username)
            return res.json({ "code": 3, "message": "please login" });

        if (session.position !== 99)
            return res.json({ "code": 5, "message": "Unauthorized" });
        // --

        let billList;
        const { idBill } = req.params;
        if (idBill) {
            const queryObject = {
                "$and": [
                    { "idBill": idBill },
                    { "idCus": session.username },
                ],
            };
            billList = await queryByObject(queryObject, billModel);
            if (!billList.length)
                return res.json({ "code": 6, "message": "id not exist" });
        } else {
            billList = await queryByObject({ "idCus": session.username }, billModel);
        }

        return res.json({ "code": 0, "data": billList });
    } catch (err) {
        return res.json({ "code": 99, "message": "err query data" });
    }
}

const loginCustomer = async (req, res) => {
    try {
        const session = req.session;
        // TODO: refactor - add lib
        if (session.username)
            return res.json({ "code": 4, "message": "you have been login!" });

        const { CMND, password } = req.body;

        if (!CMND || !password)
            return res.json({ "code": 1, "message": "not enough params" });


        const customerInfo = (await queryByObject({ "idCus": CMND }, customerModel))[0];
        if (customerInfo.length && bcrypt.compareSync(password, customerInfo.password)) {
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
            return res.json({ "code": 0, "user": customerInfo, "token": token });
        }
        return res.json({ "code": 2, "message": "username or pass wrong!" });
    }
    catch (err) {
        return res.json({ "code": 99, "message": "err query data" });
    }
}

module.exports = {
    getCustomerBills,
    loginCustomer,
};
