const inventoryModel = require('../../../services/models/inventory');
const countInputModel = require('../../../services/models/count-input');
const {
    queryByObject,
    updateByObject,
    deleteByObject,
} = require('../../../services/database');
const {
    validateAddInventory,
    validateUpdatePrice,
} = require('./api-inventory-validation');

const getInventory = async (req, res) => {
    try {
        const session = req.session;
        if (!session.username)
            return res.json({ "code": 3, "message": "please login" });

        if (session.position !== 2)
            return res.json({ "code": 5, "message": "Unauthorized" });

        let inventoryList;
        const idProduct = req.params.idProWH;
        if (idProduct) {
            inventoryList = await queryByObject({ "idProWH": idProduct }, inventoryModel);
            if (!inventoryList.length)
                return res.json({ "code": 6, "message": "id not exist" });
        } else {
            inventoryList = await queryByObject({}, inventoryModel);
        }
        return res.json({ "code": 0, "data": data });
    } catch (error) {
        return res.json({ "code": 99, "message": "err query data" });
    }
}

const getBatchInput = async (req, res) => {
    try {
        // TODO: refactor code -> add lib
        const session = req.session;
        if (!session.username)
            return res.json({ "code": 3, "message": "please login" });

        if (session.position !== 0)
            return res.json({ "code": 5, "message": "Unauthorized" });
        //--

        let inventoryData;
        const idCount = req.params.idcount;
        if (idCount) {
            inventoryData = await queryByObject({ "idcount": idCount }, countInputModel);
            if (!inventoryData.length)
                return res.json({ "code": 6, "message": "id not exist" });
        } else {
            inventoryData = await queryByObject({}, countInputModel);
        }
        return res.json({ "code": 0, "data": inventoryData });
    } catch (error) {
        return res.json({ "code": 99, "message": "err query data" });
    }
}

const addInventory = async (req, res) => {
    try {
        const session = req.session;
        if (!session.username)
            return res.json({ "code": 3, "message": "please login" });

        if (session.position !== 2)
            return res.json({ "code": 5, "message": "Unauthorized" });

        const inventoryInput = req.body;
        const inventoryValidation = validateAddInventory(inventoryInput);
        if (!inventoryValidation) {
            return res.json({ code: 1, message: 'fail to validate' });
        }

        const dateIn = new Date().toISOString();
        const idcount = String(Math.floor(Math.random() * (10000000 - 1000000)) + 100000);

        const inventoryInfo = (await queryByObject({ name: inventoryInput.name }, inventoryModel))[0];
        if (inventoryInfo) {
            if (inventoryInfo.name !== inventoryInput.name)
                return res.json({ 'code': 11, 'message': 'name wrong!' })

            const inventoryObject = {
                qty: parseInt(inventoryInput.qty) + parseInt(inventoryInfo.qty),
                price: inventoryInput.price,
                priceIn: inventoryInput.priceIn,
                dateIn,
            };
            await updateByObject({ '$set': inventoryObject }, inventoryModel, { 'idProWH': inventoryInfo.idProWH })

            const newInventoryProduct = {
                idcount,
                idProWH: inventoryInput.idProWH,
                name: inventoryInput.name,
                qty: inventoryInput.qty,
                priceIn: inventoryInput.priceIn,
                sum: parseInt(inventoryInput.qty) * parseInt(inventoryInput.priceIn),
                dateIn,
            };

            await (new inventoryModel(newInventoryProduct)).save();

            return res.json({ code: 0, message: 'add product into inventory successfully' });
        }
        else {
            const newInventoryProduct = {
                ...inventoryInput,
                dateIn,
            };

            await (new inventoryModel(newInventoryProduct)).save();

            let newCountInputProduct = {
                idcount: inventoryInput.idcount,
                idProWH: inventoryInput.idProWH,
                name: inventoryInput.name,
                qty: inventoryInput.qty,
                priceIn: inventoryInput.priceIn,
                sum: parseInt(qty) * parseInt(priceIn),
                dateIn,
            };

            await (new countInputModel(newCountInputProduct)).save();

            return res.json({ 'code': 0, 'data': newWH })
        }
    }
    catch (err) {
        return res.json({ 'code': 99, 'message': 'err query data' })
    }
}


const deleteInventory = async (req, res) => {
    try {
        const session = req.session;
        if (!session.username)
            return res.json({ "code": 3, "message": "please login" });

        if (session.position !== 2)
            return res.json({ "code": 5, "message": "Unauthorized" });

        const idInventoryInput = req.body.idProWH;
        if (!idInventoryInput) {
            return res.json({ code: 1, message: "fail to validate" });
        }

        const inventoryProduct = (await queryByObject({ "idProWH": idInventoryInput.idProWH }))[0];
        if (!inventoryProduct) {
            return res.json({ "code": 6, "message": "id not exist" });
        }
        await deleteByObject(inventoryModel, { "idProWH": idProWH })
        return res.json({ "code": 0, "message": `Delete ${inventoryProduct.idProWH} successfully` });
    } catch (err) {
        return res.json({ "code": 99, "message": "err query data" });
    }
}

const updatePriceForProductInventory = async (req, res) => {
    try {
        const session = req.session;
        if (!session.username)
            return res.json({ "code": 3, "message": "please login" });

        if (session.position !== 2)
            return res.json({ "code": 5, "message": "Unauthorized" });

        const inventoryInput = req.body;
        const updatePriceValidation = validateUpdatePrice(input);

        if (!updatePriceValidation) {
            return res.json({ code: 1, message: 'fail to validate' });
        }

        const inventoryProduct = (await queryByObject({ "idProWH": inventoryInput.idProWH }, inventoryModel))[0];
        if (!inventoryProduct) {
            return res.json({ "code": 6, "message": "id not exist" });
        }
        await updateByObject({ "idProWH": inventoryInput.idProWH }, { "$set": { "price": inventoryInput.price } });
        return res.json({
            code: 0,
            message: `Update ${inventoryInput.idProWH} successfully`,
        });
    } catch (err) {
        return res.json({ "code": 99, "message": "err query data" });
    }
}

module.exports = {
    getBatchInput,
    getInventory,
    addInventory,
    deleteInventory,
    updatePriceForProductInventory,
};
