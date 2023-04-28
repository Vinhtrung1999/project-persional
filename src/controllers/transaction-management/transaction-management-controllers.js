const pay = (req, res) => {
    const session = req.session;
    if (!session.username)
        return res.redirect('/staff/login')
    if (session.position !== 1)
        return res.redirect('/')

    const layoutOptions = {
        content: '../pages/pay',
        name: session.name,
        token: session.token,
        position: session.position,
    };
    return res.render('layouts/main', layoutOptions);
}

const confirmOTPCode = (req, res) => {
    const session = req.session;
    if (!session.username)
        return res.redirect('/staff/login')
    if (session.position !== 1)
        return res.redirect('/')

    const layoutOptions = {
        content: '../pages/confirmOTPcode',
        name: session.name,
        token: session.token,
        position: session.position,
    };
    return res.render('layouts/main', layoutOptions);
}

const incorrectOTP = (req, res) => {
    const session = req.session;
    if (!session.username)
        return res.redirect('/staff/login')
    if (session.position !== 1)
        return res.redirect('/')
    return res.render('pages/OTPwrong')
}

module.exports = {
    pay,
    incorrectOTP,
    confirmOTPCode,
};
