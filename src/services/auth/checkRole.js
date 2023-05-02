const checkRoleAdmin = (req, res, next) => {
  const userRole = req.session.position;
  if (userRole !== 0)
    return res.redirect('/');
  next();
}

const checkRoleSale = (req, res, next) => {
  const userRole = req.session.position;
  if (userRole !== 1)
    return res.redirect('/');
  next();
}

const checkRoleEmployee = (req, res, next) => {
  const userRole = req.session.position;
  if (userRole !== 2)
    return res.redirect('/');
  next();
}

const checkRoleSaleAndEmployee = (req, res, next) => {
  const userRole = req.session.position;
  if (userRole !== 2 && userRole !== 1)
    return res.redirect('/');
  next();
}

module.exports = {
  checkRoleAdmin,
  checkRoleSale,
  checkRoleEmployee,
  checkRoleSaleAndEmployee,
};
