const stadiumList = (req, res) => {
    const session = req.session;

    const layoutOptions = {
        content: '../pages/listSvd',
        name: session.name,
        token: session.token,
        position: session.position,
    };
    return res.render('layouts/main', layoutOptions);
}

const stadiumDetails = (req, res) => {
    const session = req.session;

    const layoutOptions = {
        content: '../pages/svdDetail',
        name: session.name,
        token: session.token,
        position: session.position,
        mess: req.query.mess || '',
    };
    return res.render('layouts/main', layoutOptions)
}

const addStadium = (req, res) => {
    const session = req.session;

    const layoutOptions = {
        content: '../pages/addSvd',
        name: session.name,
        token: session.token,
        position: session.position,
    };
    return res.render('layouts/main', layoutOptions);
}

module.exports = {
    stadiumDetails,
    stadiumList,
    addStadium,
};
