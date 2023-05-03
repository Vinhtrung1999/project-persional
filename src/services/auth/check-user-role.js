const checkRoleAdmin = (req, res, next) => {
  const userRole = req.session.user.position;
  if (userRole !== 0)
    return res.redirect('/');
  next();
}

const checkRoleSale = (req, res, next) => {
  const userRole = req.session.user.position;
  if (userRole !== 1)
    return res.redirect('/');
  next();
}

const checkRoleEmployee = (req, res, next) => {
  const userRole = req.session.user.position;
  if (userRole !== 2)
    return res.redirect('/');
  next();
}

const checkRoleSaleAndEmployee = (req, res, next) => {
  const userRole = req.session.user.position;
  if (userRole !== 2 && userRole !== 1)
    return res.redirect('/');
  next();
}

const checkRoleAdminApi = (req, res, next) => {
  const userRole = req.user.position;
  if (userRole !== 0) {
    return res.json({
      code: 5,
      message: 'User unauthorized - please contact to admin',
    });
  }
  next();
}

const checkRoleSaleApi = (req, res, next) => {
  const userRole = req.user.position;
  if (userRole !== 1) {
    return res.json({
      code: 5,
      message: 'User unauthorized - please contact to admin',
    });
  }
  next();
}

const checkRoleEmployeeApi = (req, res, next) => {
  const userRole = req.user.position;
  if (userRole !== 2) {
    return res.json({
      code: 5,
      message: 'User unauthorized - please contact to admin',
    });
  }
  next();
}

const checkRoleAdminAndSaleApi = (req, res, next) => {
  const userRole = req.user.position;
  if (userRole !== 0 && userRole !== 1) {
    return res.json({
      code: 5,
      message: 'User unauthorized - please contact to admin',
    });
  }
  next();
}

const checkRoleAdminAndEmployeeApi = (req, res, next) => {
  const userRole = req.user.position;
  if (userRole !== 0 && userRole !== 2) {
    return res.json({
      code: 5,
      message: 'User unauthorized - please contact to admin',
    });
  }
  next();
}

const checkRoleSaleAndEmployeeApi = (req, res, next) => {
  const userRole = req.user.position;
  if (userRole !== 1 && userRole !== 2) {
    return res.json({
      code: 5,
      message: 'User unauthorized - please contact to admin',
    });
  }
  next();
}

module.exports = {
  checkRoleAdmin,
  checkRoleSale,
  checkRoleEmployee,
  checkRoleSaleAndEmployee,
  checkRoleAdminApi,
  checkRoleSaleApi,
  checkRoleEmployeeApi,
  checkRoleAdminAndSaleApi,
  checkRoleAdminAndEmployeeApi,
  checkRoleSaleAndEmployeeApi,
};
