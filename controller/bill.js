class bill {
    listBill = (req, res)=>{
        if(!req.session.username)
            return res.redirect('/staff/login')
        if(req.session.position !== 1)
            return res.redirect('/')
        var content = '../pages/listBills'
        return res.render('layouts/main',{content, name:req.session.name, token:req.session.token, position:req.session.position})
    }

    billDetail = (req, res)=>{
        if(!req.session.username)
            return res.redirect('/staff/login')
        if(req.session.position !== 1)
            return res.redirect('/')
        var content = '../pages/billDetail'
        return res.render('layouts/main',{content, name:req.session.name, token:req.session.token, position:req.session.position})
    }

    //history
    history = (req, res)=>{
        if(!req.session.username)
            return res.redirect('/customer/login')
        let name = req.session.name || ''
        let page = 'history'
        return res.render('layouts/main-view-customer',{name, page, token:req.session.token})
    }

    historyDetail = (req, res)=>{
        if(!req.session.username)
            return res.redirect('/customer/login')
        let name = req.session.name || ''
        let page = 'historyDetail'
        return res.render('layouts/main-view-customer',{name, page, token:req.session.token})
    }
}

module.exports = new bill