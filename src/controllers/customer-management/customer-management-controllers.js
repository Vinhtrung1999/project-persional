const customerLogin = (req, res) => {
    if (req.session.username)
        return res.redirect('/')
    return res.render('pages/loginCus')
}

const destroySession = (req, res) => {
    req.session.destroy()
    return res.redirect('/')
}

// NOTE: only staff can access
const customerList = (req, res) => {
    const session = req.session;
    if (!session.username)
        return res.redirect('/staff/login');
    if (session.position !== 1)
        return res.redirect('/')

    const layoutOptions = {
        content: '../pages/listCustomers',
        name: session.name,
        token: session.token,
        position: session.position
    };
    return res.render('layouts/main', layoutOptions);
}

const customerDetails = (req, res) => {
    const session = req.session;
    if (!session.username)
        return res.redirect('/staff/login')
    if (session.position !== 1)
        return res.redirect('/')

    const layoutOptions = {
        content: '../pages/CusDT',
        name: session.name,
        token: session.token,
        position: session.position,
    }
    return res.render('layouts/main', layoutOptions);
}

const addCustomer = (req, res) => {
    const session = req.session;
    if (!session.username)
        return res.redirect('/staff/login')
    if (session.position !== 1)
        return res.redirect('/')

    const layoutOptions = {
        content: '../pages/addCustomers',
        name: session.name,
        token: session.token,
        position: session.position,
    };
    return res.render('layouts/main', layoutOptions);
}

module.exports = {
    customerLogin,
    customerList,
    customerDetails,
    addCustomer,
    destroySession,
};
