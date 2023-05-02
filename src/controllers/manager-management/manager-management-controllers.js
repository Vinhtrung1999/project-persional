const profile = (req, res) => {
    const session = req.session;
    const layoutOption = {
        content: '../page-managers/profile-manager',
        name: session.name,
        token: session.token,
        position: session.position,
    }
    return res.render('layouts/main', layoutOption);
}

const staffList = (req, res) => {
    const session = req.session;

    const layoutOption = {
        content: '../page-managers/staff-manager',
        name: session.name,
        token: session.token,
        position: session.position,
    }
    return res.render('layouts/main', layoutOption);
}

const statisticList = (req, res) => {
    const session = req.session;
    const layoutOption = {
        content: '../page-managers/statistic-manager',
        name: session.name,
        token: session.token,
        position: session.position,
    }
    return res.render('layouts/main', layoutOption);
}

const stadiumList = (req, res) => {
    const session = req.session;

    const layoutOption = {
        content: '../page-managers/stadium-manager',
        name: session.name,
        token: session.token,
        position: session.position,
    }
    return res.render('layouts/main', layoutOption);
}

const productList = (req, res) => {
    const session = req.session;

    const layoutOption = {
        content: '../page-managers/product-manager',
        name: session.name,
        token: session.token,
        position: session.position,
    }
    return res.render('layouts/main', layoutOption);
}

const equipmentList = (req, res) => {
    const session = req.session;

    const layoutOption = {
        content: '../page-managers/equipment-manager',
        name: session.name,
        token: session.token,
        position: session.position,
    }
    return res.render('layouts/main', layoutOption);
}

const inventoryList = (req, res) => {
    const session = req.session;

    const layoutOption = {
        content: '../page-managers/warehouse-manager',
        name: session.name,
        token: session.token,
        position: session.position,
    }
    return res.render('layouts/main', layoutOption);
}

const customerList = (req, res) => {
    const session = req.session;

    const layoutOption = {
        content: '../page-managers/customer-manager',
        name: session.name,
        token: session.token,
        position: session.position,
    }
    return res.render('layouts/main', layoutOption);
}

const viewInfo = (req, res) => {
    const session = req.session;

    const layoutOption = {
        content: '../page-managers/view-info-manager',
        name: session.name,
        token: session.token,
        position: session.position,
    }
    return res.render('layouts/main', layoutOption);
}


module.exports = {
    inventoryList,
    equipmentList,
    productList,
    profile,
    stadiumList,
    staffList,
    statisticList,
    customerList,
    viewInfo,
};
