const pay = (req, res) => {
    const session = req.session;

    const layoutOptions = {
        content: '../pages/pay',
        name: session.user.name,
        position: session.user.position,
    };
    return res.render('layouts/main', layoutOptions);
}

const confirmOTPCode = (req, res) => {
    const session = req.session;

    const layoutOptions = {
        content: '../pages/confirmOTPcode',
        name: session.user.name,
        position: session.user.position,
    };
    return res.render('layouts/main', layoutOptions);
}

const incorrectOTP = (req, res) => {
    return res.render('pages/OTPwrong')
}

module.exports = {
    pay,
    incorrectOTP,
    confirmOTPCode,
};
