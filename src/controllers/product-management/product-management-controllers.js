const productList = (req, res) => {
    const session = req.session;

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
