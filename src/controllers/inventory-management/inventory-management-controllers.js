const inventoryList = (req, res) => {
    const session = req.session;

    const layoutOptions = {
        content: '../pages/listWH',
        name: session.name,
        token: session.token,
        position: session.position,
    }
    return res.render('layouts/main', layoutOptions);
}

const inventoryDetails = (req, res) => {
    const session = req.session;

    const layoutOptions = {
        content: '../pages/WHDetail',
        name: session.name,
        token: session.token,
        position: session.position,
    }
    return res.render('layouts/main', layoutOptions);
}

const addInventory = (req, res) => {
    const session = req.session;

    const layoutOptions = {
        content: '../pages/addProWH',
        name: session.name,
        token: session.token,
        position: session.position,
    }
    return res.render('layouts/main', layoutOptions);
}

module.exports = {
    inventoryDetails,
    inventoryList,
    addInventory,
};
