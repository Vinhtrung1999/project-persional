const profile = (req, res) => {
    const session = req.session;
    if (!session.username)
        return res.redirect('/staff/login')

    const layoutOptions = {
        content: '../pages/profile',
        name: session.name,
        token: session.token,
        position: session.position,
    }
    return res.render('layouts/main', layoutOptions)
}

const login = (req, res) => {
    const session = req.session;

    if (session.username)
        return res.redirect('/')
    return res.render('pages/login')
}

const destroySession = (req, res) => {
    session.destroy()
    return res.redirect('/staff/login')
}

const changePass = (req, res) => {
    const session = req.session;

    if (!session.username)
        return res.redirect('/staff/login')
    const layoutOptions = {
        content: '../pages/changePass',
        name: session.name,
        token: session.token,
        position: session.position,
    }
    return res.render('layouts/main', layoutOptions)
}

const staffList = (req, res) => {
    const session = req.session;

    if (!session.username)
        return res.redirect('/staff/login')
    if (session.position !== 0)
        return res.redirect('/')

    const layoutOptions = {
        content: '../pages/listStaffs',
        name: session.name,
        token: session.token,
        position: session.position,
    }
    return res.render('layouts/main', layoutOptions);
}

const staffDetails = (req, res) => {
    const session = req.session;

    if (!session.username)
        return res.redirect('/staff/login')
    if (session.position !== 0)
        return res.redirect('/')

    const layoutOptions = {
        content: '../pages/staffDetail',
        name: session.name,
        token: session.token,
        position: session.position,
    }
    return res.render('layouts/main', layoutOptions);
}

const addStaff = (req, res) => {
    const session = req.session;

    if (!session.username)
        return res.redirect('/staff/login')
    if (session.position !== 0)
        return res.redirect('/')

    const layoutOptions = {
        content: '../pages/addStaff',
        name: session.name,
        token: session.token,
        position: session.position,
    }
    return res.render('layouts/main', layoutOptions);
}

module.exports = {
    profile,
    login,
    destroySession,
    changePass,
    staffList,
    staffDetails,
    addStaff,
};
