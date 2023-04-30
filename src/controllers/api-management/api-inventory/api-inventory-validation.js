const validateAddInventory = input => {
  const { idProWH, name, type, qty, priceIn, price } = input;
  const isExistedValues = idProWH && name && type && qty && price && priceIn;
  const validValues = (parseInt(type) === 0 || parseInt(type) === 1 || parseInt(type) === 2) && parseInt(qty) > 0 && parseInt(priceIn) >= 0 && parseInt(price) > 0;

  return isExistedValues && validValues;
};

const validateUpdatePrice = input => (input.idProWH && input.price && parseInt(input.price) >= 0);

module.exports = {
  validateAddInventory,
  validateUpdatePrice,
};
