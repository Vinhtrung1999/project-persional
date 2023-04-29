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

const getEquipment = async (req, res) => {
    try {
        const session = req.session;
        // TODO: refactor code -> add lib
        if (!session.username)
            return res.json({ "code": 3, "message": "please login" });

        if (session.position !== 0 && session.position !== 2)
            return res.json({ "code": 5, "message": "Unauthorized" });

        let equipmentData;
        const idEquipment = req.params.idTTB;
        if (idEquipment) {
            equipmentData = await queryByObject({ "idTTB": idEquipment }, equipmentModel);
            if (!equipmentData.length)
                return res.json({ "code": 6, "message": "id not exist" });
        } else {
            equipmentData = await queryByObject({}, equipmentModel);
        }
        return res.json({ "code": 0, "data": equipmentData });
    } catch (err) {
        return res.json({ "code": 99, "message": "err query data" })
    }
}

const getDamagedEquipment = async (req, res) => {
    try {
        const session = req.session;
        if (!session.username)
            return res.json({ "code": 3, "message": "please login" });

        if (session.position !== 0 && session.position !== 2)
            return res.json({ "code": 5, "message": "Unauthorized" });

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
        // TODO refactor code -> add lib
        const session = req.session;
        if (!session.username)
            return res.json({ 'code': 3, 'message': 'please login' })

        if (session.position !== 2)
            return res.json({ 'code': 5, 'message': 'Unauthorized' })
        //--

        const newEquipment = req.body;
        const equipmentValidation = validateAddEquipment(newEquipment);
        if (!equipmentValidation)
            return res.json({ 'code': 1, 'message': 'input parameters incorrect format' });

        const equipmentInfo = await queryByObject({ 'name': newEquipment.name }, equipmentModel)[0];
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
            };

            await (new equipmentModel(equipmentObj)).save();
            return res.json({ 'code': 0, 'data': equipmentObj });
        }
    } catch (err) {
        return res.json({ 'code': 99, 'message': 'Error add equipment' })
    }
}

const updateDamagedEquipment = async (req, res) => {
    try {
        // TODO: refactor code -> add lib
        const session = req.session;
        if (!session.username)
            return res.json({ "code": 3, "message": "please login" });

        if (session.position !== 2)
            return res.json({ "code": 5, "message": "Unauthorized" });

        const damagedEquipment = req.body;

        const damagedEquipmentValidation = validateAddDamagedEquipment(damagedEquipment);
        if (!damagedEquipmentValidation)
            return res.json({ 'code': 1, 'message': 'input parameters incorrect format' });

        const equipmentInfo = await queryByObject({ "idTTB": damagedEquipment.idTTB }, equipmentModel)[0];
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
