'use strict'
const billList = (req, res) => {
  const session = req.session;

  const layoutOption = {
    content: '../pages/listBills',
    name: session.user.name,
    position: session.user.position,
  };
  return res.render('layouts/main', layoutOption);
}

const billDetails = (req, res) => {
  const session = req.session;

  const layoutOption = {
    content: '../pages/billDetail',
    name: session.user.name,
    position: session.user.position,
  }
  return res.render('layouts/main', layoutOption);
}

//history
const history = (req, res) => {
  const session = req.session;

  const layoutOption = {
    name: session.user.name,
    page: 'history',
  }
  return res.render('layouts/main-view-customer', layoutOption);
}

const historyDetails = (req, res) => {
  const session = req.session;

  const layoutOption = {
    name: session.user.name,
    page: 'historyDetail',
  }
  return res.render('layouts/main-view-customer', layoutOption)
}

module.exports = {
  billDetails,
  billList,
  history,
  historyDetails,
}