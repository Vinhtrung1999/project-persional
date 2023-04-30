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

module.exports = {
  validateAddStaff,
};
