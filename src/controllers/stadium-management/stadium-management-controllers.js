const stadiumList = (req, res) => {
    const session = req.session;

    const layoutOptions = {
        content: '../pages/listSvd',
        name: session.user.name,
        position: session.user.position,
    };
    return res.render('layouts/main', layoutOptions);
}

const stadiumDetails = (req, res) => {
    const session = req.session;

    const layoutOptions = {
        content: '../pages/svdDetail',
        name: session.user.name,
        position: session.user.position,
        mess: req.query.mess || '',
    };
    return res.render('layouts/main', layoutOptions)
}

const addStadium = (req, res) => {
    const session = req.session;

    const layoutOptions = {
        content: '../pages/addSvd',
        name: session.user.name,
        position: session.user.position,
    };
    return res.render('layouts/main', layoutOptions);
}

module.exports = {
    stadiumDetails,
    stadiumList,
    addStadium,
};
