const billModel = require('../../../services/models/bill');
const { queryByObject } = require('../../../services/database');

const getBill = async (req, res) => {
    try {
        const { idBill } = req.params;
        if (idBill) {
            const queryObj = { "idBill": idBill };
            let data = await queryByObject(queryObj, billModel);
            if (data.length)
                return res.json({ "code": 0, "data": data });
            return res.json({ "code": 6, "message": "id not exist" });
        } else {
            let data = await queryByObject({});
            return res.json({ "code": 0, "data": data });
        }
    } catch (err) {
        return res.json({ "code": 99, "message": "err query data" })
    }
};
module.exports = {
    getBill,
};