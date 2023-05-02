const fee = (req, res) => {
    const session = req.session;

    const layoutOptions = {
        content: '../pages/fee',
        name: session.name,
        token: session.token,
        position: session.position,
    };
    return res.render('layouts/main', layoutOptions);
}

const profit = (req, res) => {
    const session = req.session;

    const layoutOptions = {
        content: '../pages/profit',
        name: session.name,
        token: session.token,
        position: session.position,
    };
    return res.render('layouts/main', layoutOptions);
}

module.exports = {
    fee,
    profit,
}