const jwt = require('jsonwebtoken');

const generateToken = (data, secretKey, expiredTime) => {
  const token = jwt.sign(data, secretKey, { expiresIn: expiredTime });
  return token;
}

const validateToken = (token, secretKey) => {
  return jwt.verify(token, secretKey);
}

module.exports = {
  generateToken,
  validateToken,
}