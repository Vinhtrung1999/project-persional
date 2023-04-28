const fee = (req, res) => {
    const session = req.session;
    if (!session.username)
        return res.redirect('/staff/login')
    if (session.position !== 0)
        return res.redirect('/')

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
    if (!session.username)
        return res.redirect('/staff/login')
    if (session.position !== 0)
        return res.redirect('/')

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