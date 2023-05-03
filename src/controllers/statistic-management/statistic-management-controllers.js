const fee = (req, res) => {
    const session = req.session;

    const layoutOptions = {
        content: '../pages/fee',
        name: session.user.name,
        position: session.user.position,
    };
    return res.render('layouts/main', layoutOptions);
}

const profit = (req, res) => {
    const session = req.session;

    const layoutOptions = {
        content: '../pages/profit',
        name: session.user.name,
        position: session.user.position,
    };
    return res.render('layouts/main', layoutOptions);
}

module.exports = {
    fee,
    profit,
}