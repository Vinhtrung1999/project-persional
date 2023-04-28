const inventoryList = (req, res) => {
    const session = req.session;
    if (!session.username)
        return res.redirect('/staff/login')
    if (session.position !== 2)
        return res.redirect('/')

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

    if (!session.username)
        return res.redirect('/staff/login')
    if (session.position !== 2)
        return res.redirect('/')

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

    if (!session.username)
        return res.redirect('/staff/login')
    if (session.position !== 2)
        return res.redirect('/')

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
