const welcomeView = async (req, res) => {
    let name = req.session.name || ''
    let page = 'welcome'
    return res.render('layouts/main-view-customer', { name, page })
}

const homeView = (req, res) => {
    if (req.session.position === 0)
        return res.redirect('/manager/staff-manager')
    if (req.session.position === 1)
        return res.redirect('/transaction/pay')
    if (req.session.position === 2)
        return res.redirect('/manager/stadium-manager')
    return res.redirect('/welcome')
}

const stadiumListView = (req, res) => {
    let name = req.session.name || ''
    let page = 'list-view-stadium'
    return res.render('layouts/main-view-customer', { name, page })
}

const viewDetails = (req, res) => {
    let idSvd = req.query.idSvd || ''
    if (idSvd) {
        let name = req.session.name || ''
        let page = 'viewDetail'
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
