const equipmentModel = require('../../../services/models/equipment');
const damagedEquipmentModel = require('../../../services/models/damaged-equipment');
const {
    queryByObject,
    updateByObject,
} = require('../../../services/database');
const {
    validateAddEquipment,
    validateAddDamagedEquipment,
} = require('./api-equipment-validation');
const { Logger } = require('../../../services/logger');
const {
    generateId
} = require('../../../services/utils');

const getEquipment = async (req, res) => {
    try {
        const logger = new Logger('Start get equipment');

        let equipmentData;
        const idEquipment = req.params.idTTB;
        if (idEquipment) {
            logger.info('Get equipment with id', idEquipment);
            equipmentData = await queryByObject({ "idTTB": idEquipment }, equipmentModel);
            if (!equipmentData.length) {
                logger.info('Error: equipment does not exist');
                return res.json({ "code": 6, "message": "id does not exist" });
            }
        } else {
            logger.info('Get all equipment');
            equipmentData = await queryByObject({}, equipmentModel);
        }
        logger.info('get bill successfully', equipmentData);
        return res.json({ "code": 0, "data": equipmentData });
    } catch (err) {
        logger.info('Unexpected error', JSON.stringify(err));
        return res.json({ "code": 99, "message": "err query data" })
    }
}

const getDamagedEquipment = async (req, res) => {
    try {
        let damagedEquipmentData;
        const idDamagedEquipment = req.params.idTTB_Br;
        if (idDamagedEquipment) {
            damagedEquipmentData = await queryByObject({ "idTTB_Br": idDamagedEquipment }, damagedEquipmentModel);
            if (!damagedEquipmentData.length)
                return res.json({ "code": 6, "message": "id not exist" })
        } else {
            damagedEquipmentData = await queryByObject({}, damagedEquipmentModel);
        }
        return res.json({ "code": 0, "data": damagedEquipmentData })
    }
    catch (err) {
        return res.json({ "code": 99, "message": "err query data" })
    }
}

const addEquipment = async (req, res) => {
    try {
        const newEquipment = req.body;
        const equipmentValidation = validateAddEquipment(newEquipment);
        if (!equipmentValidation)
            return res.json({ 'code': 1, 'message': 'input parameters incorrect format' });

        const equipmentId = generateId();
        const equipmentInfo = (await queryByObject({ 'name': newEquipment.name }, equipmentModel))[0];
        const dateIn = new Date().toISOString();

        if (equipmentInfo) {
            if (equipmentInfo.name !== newEquipment.name)
                return res.json({ 'code': 11, 'message': 'incorrect name!' });

            const equipmentObject = {
                qty: parseInt(newEquipment.qty) + parseInt(equipmentInfo.qty),
                priceIn: newEquipment.priceIn,
                dateIn,
            };

            await updateByObject({ '$set': equipmentObject }, equipmentModel, { 'idTTB': equipmentInfo.idTTB });
            return res.json({ 'code': 0, 'message': 'update product into inventory successfully' })
        }
        else {
            const equipmentObj = {
                ...newEquipment,
                dateIn,
                idTTB: equipmentId,
            };

            await (new equipmentModel(equipmentObj)).save();
            return res.json({ 'code': 0, 'data': equipmentObj });
        }
    } catch (err) {
        return res.json({ 
            code: 99,
            message: err.message,
         })
    }
}

const updateDamagedEquipment = async (req, res) => {
    try {
        const damagedEquipment = req.body;

        const damagedEquipmentValidation = validateAddDamagedEquipment(damagedEquipment);
        if (!damagedEquipmentValidation)
            return res.json({ 'code': 1, 'message': 'input parameters incorrect format' });

        const equipmentInfo = (await queryByObject({ "idTTB": damagedEquipment.idTTB }, equipmentModel))[0];
        if (!equipmentInfo)
            return res.json({ "code": 6, "message": "id not exist" });

        if (parseInt(equipmentInfo.qty) < parseInt(damagedEquipment.qty))
            return res.json({ "code": 10, "message": "The quantity in inventory is: " + equipmentInfo.qty });

        let qtySubtraction = {
            qty: parseInt(equipmentInfo.qty) - parseInt(damagedEquipment.qty),
        };
        await updateByObject({ '$set': qtySubtraction }, equipmentModel, { "idTTB": damagedEquipment.idTTB });

        let dateIn = new Date().toISOString();

        let idDamagedEquipment = String(Math.floor(Math.random() * (10000000 - 1000000)) + 100000);
        let damagedEquipmentObj = {
            idTTB_Br: idDamagedEquipment,
            idTTB: damagedEquipment.idTTB,
            name: equipmentInfo.name,
            qty: qtySubtraction.qty,
            priceIn: equipmentInfo.priceIn,
            dateIn,
        };

        await (new damagedEquipmentModel(damagedEquipmentObj)).save();
        return res.json({ "code": 0, "message": `Update ${damagedEquipment.idTTB} successfully` });
    } catch (err) {
        return res.json({ "code": 99, "message": "err query data" });
    }
}

module.exports = {
    getEquipment,
    getDamagedEquipment,
    addEquipment,
    updateDamagedEquipment,
}
