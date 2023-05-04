const productList = (req, res) => {
    const session = req.session;

    const layoutOptions = {
        content: '../pages/listProducts',
        name: session.user.name,
        position: session.user.position,
    };
    return res.render('layouts/main', layoutOptions);
}

const productDetails = (req, res) => {
    const session = req.session;

    const layoutOptions = {
        content: '../pages/ProDetail',
        name: session.user.name,
        position: session.user.position,
    };
    return res.render('layouts/main', layoutOptions);
}

const addProduct = (req, res) => {
    const session = req.session;

    const layoutOptions = {
        content: '../pages/addProduct',
        name: session.user.name,
        position: session.user.position,
    };
    return res.render('layouts/main', layoutOptions);
}

module.exports = {
    productDetails,
    productList,
    addProduct,
};
