const customerLogin = (req, res) => {
    const session = req.session;
    if (session.user)
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

    const layoutOptions = {
        content: '../pages/listCustomers',
        name: session.user.name,
        position: session.user.position,
    };
    return res.render('layouts/main', layoutOptions);
}

const customerDetails = (req, res) => {
    const session = req.session;

    const layoutOptions = {
        content: '../pages/CusDT',
        name: session.user.name,
        position: session.user.position,
    }
    return res.render('layouts/main', layoutOptions);
}

const addCustomer = (req, res) => {
    const session = req.session;

    const layoutOptions = {
        content: '../pages/addCustomers',
        name: session.user.name,
        position: session.user.position,
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
