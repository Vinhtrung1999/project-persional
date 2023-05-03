const equipmentList = (req, res) => {
    const session = req.session;

    const layoutOptions = {
        content: '../pages/listTTB',
        name: session.user.name,
        position: session.user.position,
    }
    return res.render('layouts/main', layoutOptions);
}

const damagedEquipmentList = (req, res) => {
    const session = req.session;

    const layoutOptions = {
        content: '../pages/listTTBBr',
        name: session.user.name,
        position: session.user.position,
    }
    return res.render('layouts/main', layoutOptions)
}

const damagedEquipmentDetails = (req, res) => {
    const session = req.session;

    const layoutOptions = {
        content: '../pages/TTBBrDetail',
        name: session.user.name,
        position: session.user.position,
    }
    return res.render('layouts/main', layoutOptions);
}

const equipmentDetails = (req, res) => {
    const session = req.session;

    const layoutOptions = {
        content: '../pages/TTBDetail',
        name: session.user.name,
        position: session.user.position,
    }
    return res.render('layouts/main', layoutOptions)
}

const addEquipment = (req, res) => {
    const session = req.session;

    const layoutOptions = {
        content: '../pages/addTTB',
        name: session.user.name,
        position: session.user.position,
    }
    return res.render('layouts/main', layoutOptions)
}


module.exports = {
    equipmentList,
    damagedEquipmentList,
    damagedEquipmentDetails,
    equipmentDetails,
    addEquipment,
}
