const welcomeView = async (req, res) => {
    const name = req.session.name || ''
    const page = 'welcome'
    return res.render('layouts/main-view-customer', { name, page })
}

const homeView = (req, res) => {
    const userRole = req.session.position;
    if (userRole === 0)
        return res.redirect('/manager/staff-manager')
    if (userRole === 1)
        return res.redirect('/transaction/pay')
    if (userRole === 2)
        return res.redirect('/manager/stadium-manager')
    return res.redirect('/welcome')
}

const stadiumListView = (req, res) => {
    const name = req.session.name || ''
    const page = 'list-view-stadium'
    return res.render('layouts/main-view-customer', { name, page })
}

const viewDetails = (req, res) => {
    const idSvd = req.query.idSvd || ''
    if (idSvd) {
        const name = req.session.name || ''
        const page = 'viewDetail'
        return res.render('layouts/main-view-customer', { name, page })
    }
    return res.redirect('/list-view-stadiums')
}

module.exports = {
    welcomeView,
    stadiumListView,
    homeView,
    viewDetails,
};
