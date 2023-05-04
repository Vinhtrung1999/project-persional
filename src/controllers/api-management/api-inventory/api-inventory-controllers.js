const inventoryModel = require('../../../services/models/inventory');
const countInputModel = require('../../../services/models/count-input');
const {
    generateId
} = require('../../../services/utils');
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
        let inventoryList;
        const idProduct = req.params.idProWH;
        if (idProduct) {
            inventoryList = await queryByObject({ "idProWH": idProduct }, inventoryModel);
            if (!inventoryList.length)
                return res.json({ "code": 6, "message": "id not exist" });
        } else {
            inventoryList = await queryByObject({}, inventoryModel);
        }
        return res.json({ "code": 0, "data": inventoryList });
    } catch (error) {
        return res.json({ "code": 99, "message": "err query data" });
    }
}

const getBatchInput = async (req, res) => {
    try {
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
        const inventoryInput = req.body;
        const inventoryValidation = validateAddInventory(inventoryInput);
        if (!inventoryValidation) {
            return res.json({ code: 1, message: 'fail to validate' });
        }

        const idInventory = generateId();
        const dateIn = new Date().toISOString();
        const idCount = String(Math.floor(Math.random() * (10000000 - 1000000)) + 100000);

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

            const newCountInputProduct = {
                idcount: idCount,
                idProWH: inventoryInfo.idProWH,
                name: inventoryInput.name,
                qty: inventoryInput.qty,
                priceIn: inventoryInput.priceIn,
                sum: parseInt(inventoryInput.qty) * parseInt(inventoryInput.priceIn),
                dateIn,
            };

            await (new countInputModel(newCountInputProduct)).save();

            return res.json({ code: 0, message: 'add product into inventory successfully' });
        }
        else {
            const newInventoryProduct = {
                ...inventoryInput,
                dateIn,
                idProWH: idInventory,
            };

            await (new inventoryModel(newInventoryProduct)).save();

            let newCountInputProduct = {
                idcount: idCount,
                idProWH: idInventory,
                name: inventoryInput.name,
                qty: inventoryInput.qty,
                priceIn: inventoryInput.priceIn,
                sum: parseInt(inventoryInput.qty) * parseInt(inventoryInput.priceIn),
                dateIn,
            };

            await (new countInputModel(newCountInputProduct)).save();

            return res.json({ 'code': 0, message: 'add product into inventory successfully' })
        }
    }
    catch (err) {
        return res.json({ 'code': 99, 'message': 'err query data' })
    }
}


const deleteInventory = async (req, res) => {
    try {
        const idInventoryInput = req.body;
        if (!idInventoryInput) {
            return res.json({ code: 1, message: "fail to validate" });
        }

        const inventoryProduct = (await queryByObject({ "idProWH": idInventoryInput.idProWH }, inventoryModel))[0];
        if (!inventoryProduct) {
            return res.json({ "code": 6, "message": "id not exist" });
        }
        await deleteByObject(inventoryModel, { "idProWH": idInventoryInput.idProWH })
        return res.json({ "code": 0, "message": `Delete ${inventoryProduct.idProWH} successfully` });
    } catch (err) {
        return res.json({
            code: 99,
            message: err.message,
        });
    }
}

const updatePriceForProductInventory = async (req, res) => {
    try {
        const inventoryInput = req.body;
        const updatePriceValidation = validateUpdatePrice(inventoryInput);

        if (!updatePriceValidation) {
            return res.json({ code: 1, message: 'fail to validate' });
        }

        const inventoryProduct = (await queryByObject({ "idProWH": inventoryInput.idProWH }, inventoryModel))[0];
        if (!inventoryProduct) {
            return res.json({ "code": 6, "message": "id not exist" });
        }
        const updateObject = {
            price: inventoryInput.price,
        };
        await updateByObject({ "$set": updateObject }, inventoryModel, { "idProWH": inventoryInput.idProWH });
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
