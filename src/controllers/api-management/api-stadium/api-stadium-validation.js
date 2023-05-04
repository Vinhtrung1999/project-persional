const validateAddStadium = input => {
  const { name, status, capacity, type, price, image, image_detail_1, image_detail_2 } = input;
  const isExistedValues = (name && status && capacity && type && price && image && image_detail_1 && image_detail_2);
  const validValues = ((parseInt(status) === 0 || parseInt(status) === 1)
    && parseInt(capacity) >= 0
    && (parseInt(type) === 0 || parseInt(type) === 1)
    && parseInt(price) > 0);

  return isExistedValues && validValues;
};

const validateUpdateStadium = input => {
  const { idSvd, name, status, capacity, type, price, image, image_detail_1, image_detail_2 } = input;
  const isExistedValues = (idSvd && status && capacity && type && price && image && image_detail_1 && image_detail_2);
  const validValues = ((parseInt(status) === 0 || parseInt(status) === 1)
    && parseInt(capacity) > 0
    && (parseInt(type) === 0 || parseInt(type) === 1)
    && parseInt(price) > 0
    && image);
  return isExistedValues && validValues;
}

module.exports = {
  validateAddStadium,
  validateUpdateStadium,
};
