const inventoryModel = require('../../../services/models/inventory');
const productModel = require('../../../services/models/product');
const {
    queryByObject,
    updateByObject,
    deleteByObject,
} = require('../../../services/database');
const {
    validateAddProduct,
} = require('./api-product-validation');

const getProduct = async (req, res) => {
    try {
        let productData;
        const idProduct = req.params.idPro;
        if (idProduct) {
            productData = await queryByObject({ "idPro": idProduct }, productModel);
            if (!productData.length)
                return res.json({ "code": 6, "message": "id not exist" });
        } else {
            productData = await queryByObject({}, productModel);
        }
        return res.json({ "code": 0, "data": productData })
    } catch (err) {
        return res.json({ "code": 99, "message": "err query data" })
    }
}

const addProduct = async (req, res) => {
    const productInput = req.body;
    const productValidation = validateAddProduct(productInput);
    if (!productValidation) {
        return res.json({
            code: 0,
            message: 'Fail to validate',
        });
    }

    const dateIn = new Date().toISOString();
    try {
        const productInventory = (await queryByObject({ "idProWH": productInput.idPro }, inventoryModel))[0];
        if (!productInventory)
            return res.json({
                code: 10,
                message: `Product ${productInput.idPro} sold out`,
            });

        const qtySubtraction = parseInt(productInventory.qty) - parseInt(productInput.qty)
        if (qtySubtraction < 0)
            return res.json({
                code: 10,
                message: `Inventory is ${productInventory.qty}`,
            });

        const productData = (await queryByObject({ "name": productInventory.name }, productModel))[0];

        if (productData) {
            const productObj = {
                qty: parseInt(productInput.qty) + parseInt(productData.qty),
                price: productData.price,
                dateIn,
            };

            const inventoryObj = { qty: qtySubtraction };
            await Promise.all([
                updateByObject({ "$set": productObj }, productModel, { "idPro": productData.idPro }),
                updateByObject({ "$set": inventoryObj }, inventoryModel, { "idProWH": productInput.idPro }),
            ]);

            return res.json({
                code: 0,
                message: 'Update product successfully',
            });
        }
        //add new product
        else {
            const newProduct = {
                ...productInput,
                name: productInventory.name,
                type: productInventory.type,
                price: parseInt(productInventory.price),
                dateIn,
            };
            const inventoryObj = { qty: qtySubtraction };
            await Promise.all([
                (new productModel(newProduct)).save(),
                updateByObject({ "idProWH": idPro }, inventoryModel, { "$set": inventoryObj }),
            ]);
            return res.json({
                code: 0,
                data: newProduct,
            });
        }
    }
    catch (err) {
        return res.json({ "code": 99, "message": "err query data" })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const idProduct = req.body.idPro;
        if (!idProduct) {
            return res.json({ code: 1, message: 'fail to validate' });
        }

        const productData = (await queryByObject({ "idPro": idProduct }, productModel))[0];

        if (!productData) {
            return res.json({ "code": 6, "message": "id not exist" })
        }
        await deleteByObject(productModel, { "idPro": idProduct });
        return res.json({
            code: 0,
            message: `Delete ${idProduct} successfully`,
        });
    }
    catch (err) {
        return res.json({ "code": 99, "message": "err query data" })
    }
}

module.exports = {
    getProduct,
    addProduct,
    deleteProduct,
};
