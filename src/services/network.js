const axios = require('axios');

const request = async config => {
  const result = await axios(config);
  return result;
}

module.exports = {
  request,
};
