'use strict'
const billList = (req, res) => {
  const session = req.session;

  const layoutOption = {
    content: '../pages/listBills',
    name: session.name,
    token: session.token,
    position: session.position,
  };
  return res.render('layouts/main', layoutOption);
}

const billDetails = (req, res) => {
  const session = req.session;

  const layoutOption = {
    content: '../pages/billDetail',
    name: session.name,
    token: session.token,
    position: session.position,
  }
  return res.render('layouts/main', layoutOption);
}

//history
const history = (req, res) => {
  const session = req.session;

  const layoutOption = {
    name: session.name,
    page: 'history',
    token: session.token,
  }
  return res.render('layouts/main-view-customer', layoutOption);
}

const historyDetails = (req, res) => {
  const session = req.session;

  const layoutOption = {
    name: session.name,
    page: 'historyDetail',
    token: session.token,
  }
  return res.render('layouts/main-view-customer', layoutOption)
}

module.exports = {
  billDetails,
  billList,
  history,
  historyDetails,
}