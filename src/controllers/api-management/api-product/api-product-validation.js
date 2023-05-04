const validateAddProduct = input => (input.idPro && input.qty && parseInt(input.qty) > 0);

module.exports = {
  validateAddProduct,
};
