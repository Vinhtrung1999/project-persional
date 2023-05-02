const staffModel = require('../../services/models/staff');
const { queryByObject } = require('../../services/database');
const adminInfo = require('../../../test/data/start-system-dummy-data');
const bcrypt = require('bcrypt');

const addAdmin = async (req, res) => {
  try {
    const checkAdmin = (await queryByObject({ idStaff: 'admin' }, staffModel))[0];
    if (checkAdmin) {
      return res.json({
        code: 1,
        message: 'System has been started.',
      });
    }

    const adminObject = {
      ...adminInfo,
      password: bcrypt.hashSync(adminInfo.password, 10),
    }
    await (new staffModel(adminObject)).save();
    return res.json({
      code: 0,
      message: 'System is started',
    });
  } catch (error) {
    return res.json({
      code: 1,
      message: JSON.stringify(error),
    });
  }
}

module.exports = {
  addAdmin,
};
