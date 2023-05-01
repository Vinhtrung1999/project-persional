const { emailValidator } = require('../../../services/utils');
const validateAddStaff = input => {
  const { idStaff, password, name, gender, age, salary, shift, position } = input;
  const isExistedValues = (idStaff && password && name && gender && age && salary && shift && position);
  const validValues = (!isNaN(parseInt(age))
    && !isNaN(parseInt(gender))
    && !isNaN(parseInt(position))
    && !isNaN(parseInt(salary))
    && (parseInt(gender) === 0 || parseInt(gender) === 1)
    && (parseInt(position) === 0 || parseInt(position) === 1 || parseInt(position) === 2)
    && parseInt(salary) > 0);

  return isExistedValues && validValues;
};

const validatePayment = input => {
  const { idBill, idCus, listSvd, listProducts, sum, dateUse, dateOrder } = input;
  const isExistedValues = (idBill && listProducts && listSvd && idCus && sum && dateUse && dateOrder);
  const validValues = ((listSvd.length !== 0 || listProducts.length !== 0)
    && parseInt(sum) > 0);
  return isExistedValues && validValues;
};

const validateAddCustomer = input => {
  const { name, gender, CMND, phone, email } = input;
  const isExistedValues = (name && CMND && phone && email);
  const validValues = ((parseInt(gender) === 0 || parseInt(gender) === 1)
    && emailValidator(email))

  return isExistedValues && validValues;
}

const validateUpdateStaff = input => {
  const { idStaff, shift, salary, position } = input;
  const isExistedValues = (idStaff && shift && salary && position);
  const validValues = ((parseInt(position) === 0 || parseInt(position) === 1 || parseInt(position) === 2)
    && parseInt(salary) > 0)

  return isExistedValues && validValues;
}

module.exports = {
  validateAddStaff,
  validatePayment,
  validateAddCustomer,
  validateUpdateStaff,
};
