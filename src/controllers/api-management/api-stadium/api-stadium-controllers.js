const { stadiumModel } = require('../../../services/models/stadium');
const {
    queryByObject,
    updateByObject,
} = require('../../../services/database');
const {
    validateAddStadium,
    validateUpdateStadium
} = require('./api-stadium-validation');
const {
    generateId
} = require('../../../services/utils');

const getStadium = async (req, res) => {
    try {
        let stadiumData;
        const idStadium = req.params.idSvd;
        if (idStadium) {
            stadiumData = (await queryByObject({ 'idSvd': idStadium }, stadiumModel))[0];
            if (!stadiumData)
                return res.json({ 'code': 6, 'message': 'id not exist' })
        } else {
            stadiumData = await queryByObject({}, stadiumModel);
        }
        return res.json({ 'code': 0, 'data': stadiumData })
    } catch (err) {
        return res.json({ 'code': 99, 'message': 'err query data' })
    }
}

const addStadium = async (req, res) => {
    try {
        const stadiumInput = req.body;
        const stadiumValidation = validateAddStadium(stadiumInput);
        if (!stadiumValidation) {
            return res.json({
                code: 1,
                message: 'fail to validate',
            });
        }

        const idStadium = generateId();
        const stadiumInfo = await queryByObject({ 'idSvd': idStadium }, stadiumModel);

        if (stadiumInfo.length > 0)
            return res.json({ 'code': 8, 'message': 'id existed, please try again' })

        const newStadium = {
            ...stadiumInput,
            idSvd: idStadium,
        }

        await (new stadiumModel(newStadium)).save();

        return res.json({
            code: 0,
            data: newStadium,
        });
    }
    catch (err) {
        return res.json({ 'code': 99, 'message': 'err query data' })
    }
}

const updateStadium = async (req, res) => {
    try {
        const stadiumInput = req.body;
        const stadiumValidation = validateUpdateStadium(stadiumInput);
        if (!stadiumValidation) {
            return res.json({
                code: 1,
                message: 'Fail to validate',
            });
        }

        const stadiumInfo = (await queryByObject({ idSvd: stadiumInput.idSvd }, stadiumModel))[0];
        if (!stadiumInfo) {
            return res.json({ 'code': 6, 'message': 'id not exist' })
        }

        const newStadium = {
            type: stadiumInput.type,
            capacity: stadiumInput.capacity,
            status: stadiumInput.status,
            price: stadiumInput.price,
            image: stadiumInput.image,
            image_detail_1: stadiumInput.image_detail_1,
            image_detail_2: stadiumInput.image_detail_2
        }
        await updateByObject({ '$set': newStadium }, stadiumModel, { 'idSvd': stadiumInput.idSvd })

        return res.json({
            code: 0,
            message: `Update stadium ${stadiumInput.idSvd} successfully`,
        });
    }
    catch (err) {
        return res.json({ 'code': 99, 'message': 'query data wrong' })
    }
}
module.exports = {
    getStadium,
    addStadium,
    updateStadium,
};
