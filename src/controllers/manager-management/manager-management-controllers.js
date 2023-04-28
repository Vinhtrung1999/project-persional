const profile = (req, res) => {
    const session = req.session;
    if (!session.username)
        return res.redirect('/staff/login')

    const layoutOption = {
        content: '../page-managers/profile-manager',
        name: session.name,
        token: session.token,
        position: session.position,
    }
    return res.render('layouts/main', layoutOption);
}

const staffs = (req, res) => {
    const session = req.session;

    if (!session.username)
        return res.redirect('/staff/login')
    if (session.position !== 0)
        return res.redirect('/')
    const layoutOption = {
        content: '../page-managers/staff-manager',
        name: session.name,
        token: session.token,
        position: session.position,
    }
    return res.render('layouts/main', layoutOption);
}

const statistic = (req, res) => {
    const session = req.session;
    if (!session.username)
        return res.redirect('/staff/login')
    if (session.position !== 0)
        return res.redirect('/')
    const layoutOption = {
        content: '../page-managers/statistic-manager',
        name: session.name,
        token: session.token,
        position: session.position,
    }
    return res.render('layouts/main', layoutOption);
}

const stadiums = (req, res) => {
    const session = req.session;
    if (!session.username)
        return res.redirect('/staff/login')
    if (session.position !== 2)
        return res.redirect('/')
    const layoutOption = {
        content: '../page-managers/stadium-manager',
        name: session.name,
        token: session.token,
        position: session.position,
    }
    return res.render('layouts/main', layoutOption);
}

const products = (req, res) => {
    const session = req.session;

    if (!session.username)
        return res.redirect('/staff/login')
    if (session.position !== 2)
        return res.redirect('/')
    const layoutOption = {
        content: '../page-managers/product-manager',
        name: session.name,
        token: session.token,
        position: session.position,
    }
    return res.render('layouts/main', layoutOption);
}

const equipment = (req, res) => {
    const session = req.session;

    if (!session.username)
        return res.redirect('/staff/login')
    if (session.position !== 2)
        return res.redirect('/')
    const layoutOption = {
        content: '../page-managers/equipment-manager',
        name: session.name,
        token: session.token,
        position: session.position,
    }
    return res.render('layouts/main', layoutOption);
}

const inventory = (req, res) => {
    const session = req.session;

    if (!session.username)
        return res.redirect('/staff/login')
    if (session.position !== 2)
        return res.redirect('/')
    const layoutOption = {
        content: '../page-managers/warehouse-manager',
        name: session.name,
        token: session.token,
        position: session.position,
    }
    return res.render('layouts/main', layoutOption);
}

const customers = (req, res) => {
    const session = req.session;

    if (!session.username)
        return res.redirect('/staff/login')
    if (session.position !== 1)
        return res.redirect('/')
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

    if (!session.username)
        return res.redirect('/staff/login')
    if (session.position !== 1)
        return res.redirect('/')
    const layoutOption = {
        content: '../page-managers/view-info-manager',
        name: session.name,
        token: session.token,
        position: session.position,
    }
    return res.render('layouts/main', layoutOption);
}


module.exports = {
    inventory,
    equipment,
    products,
    profile,
    stadiums,
    staffs,
    statistic,
    customers,
    viewInfo,
};
