const { request } = require('../../services/network');
const welcomeView = async (req, res) => {
    const name = req.session?.user?.name || ''
    const page = 'welcome'
    return res.render('layouts/main-view-customer', { name, page })
}

const homeView = async (req, res) => {
    const { token = '', type = '' } = req.query;
    if (!(token && type)) {
        if ([0, 1, 2].includes(req.session?.user?.position)) {
            const role = req.session?.user?.position;
            if (role === 0)
                return res.redirect('/manager/staff-manager')
            if (role === 1)
                return res.redirect('/transaction/pay')
            if (role === 2)
                return res.redirect('/manager/stadium-manager')
        }
        return res.redirect('/welcome');
    }
    switch (type) {
        case 'staff':
            let userRole = req.session?.user?.position || '';
            if (!userRole) {
                try {
                    const responseApi = await request({
                        method: 'get',
                        url: 'http://localhost:3100/api/staff/getProfileAPI',
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
            break;
        case 'customer':
            const responseApi = await request({
                method: 'get',
                url: 'http://localhost:3100/api/customer/customer-profile',
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
            return res.redirect('/welcome')
        default:
            return res.redirect('/staff/login');
    }


}

const stadiumListView = (req, res) => {
    const name = req.session?.user?.name || ''
    const page = 'list-view-stadium'
    return res.render('layouts/main-view-customer', { name, page })
}

const viewDetails = (req, res) => {
    const idSvd = req.query.idSvd || ''
    if (idSvd) {
        const name = req.session?.user?.name || '';
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
