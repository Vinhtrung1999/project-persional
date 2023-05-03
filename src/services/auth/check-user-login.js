const checkStaffLogin = (req, res, next) => {
  const session = req.session;
  if (!session.user) {
    return res.redirect('/staff/login');
  }
  next();
}

const checkCustomerLogin = (req, res, next) => {
  const session = req.session;
  if (!session.username) {
    return res.redirect('/pages/loginCus');
  }
  next();
}

module.exports = {
  checkStaffLogin,
  checkCustomerLogin,
};
