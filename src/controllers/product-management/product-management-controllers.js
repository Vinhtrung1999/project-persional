const productList = (req, res) => {
    const session = req.session;
    if (!session.username)
        return res.redirect('/staff/login')
    if (session.position !== 2 && session.position !== 1)
        return res.redirect('/')

    const layoutOptions = {
        content: '../pages/listProducts',
        name: session.name,
        token: session.token,
        position: session.position,
    };
    return res.render('layouts/main', layoutOptions);
}

const productDetails = (req, res) => {
    const session = req.session;

    if (!session.username)
        return res.redirect('/staff/login')
    if (session.position !== 2 && session.position !== 1)
        return res.redirect('/')

    const layoutOptions = {
        content: '../pages/ProDetail',
        name: session.name,
        token: session.token,
        position: session.position,
    };
    return res.render('layouts/main', layoutOptions);
}

const addProduct = (req, res) => {
    const session = req.session;

    if (!session.username)
        return res.redirect('/staff/login')
    if (session.position !== 2)
        return res.redirect('/')

    const layoutOptions = {
        content: '../pages/addProduct',
        name: session.name,
        token: session.token,
        position: session.position,
    };
    return res.render('layouts/main', layoutOptions);
}

module.exports = {
    productDetails,
    productList,
    addProduct,
};
