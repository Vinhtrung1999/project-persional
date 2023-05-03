const { request } = require('../../services/network');
const welcomeView = async (req, res) => {
    const name = req.session.name || ''
    const page = 'welcome'
    return res.render('layouts/main-view-customer', { name, page })
}

const homeView = async (req, res) => {
    const token = req.query.token || '';
    if (!token) {
        return res.redirect('/staff/login');
    }
    let userRole = req.session?.user?.position || '';
    if (!userRole) {
        try {
            const responseApi = await request({
                method: 'get',
                url: 'http://localhost:3000/api/staff/getProfileAPI',
                headers: {
                    'Content-Type': 'application/json',
                    token,
                }
            })

            const userData = responseApi.data;
            if (userData.code !== 0) {
                return res.redirect('/staff/login');
            }

            req.session.user = userData.data;
            userRole = userData.data.position;
        } catch (error) {
            return res.redirect('/staff/login');
        }

    }
    if (userRole === 0)
        return res.redirect('/manager/staff-manager')
    if (userRole === 1)
        return res.redirect('/transaction/pay')
    if (userRole === 2)
        return res.redirect('/manager/stadium-manager')
    return res.redirect('/welcome')
}

const stadiumListView = (req, res) => {
    const name = req.session.user.name || ''
    const page = 'list-view-stadium'
    return res.render('layouts/main-view-customer', { name, page })
}

const viewDetails = (req, res) => {
    const idSvd = req.query.idSvd || ''
    if (idSvd) {
        const name = req.session.user.name || ''
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
