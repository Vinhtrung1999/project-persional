const validateAddEquipment = ({ name, qty, priceIn }) => name && qty && priceIn && parseInt(priceIn) >= 0 && parseInt(qty) > 0;

const validateAddDamagedEquipment = ({ idTTB, qty }) => idTTB && qty && parseInt(qty) > 0;

module.exports = {
  validateAddEquipment,
  validateAddDamagedEquipment,
};
