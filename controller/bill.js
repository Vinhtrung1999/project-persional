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
            return res.redirect('/staff/login')
        if(req.session.position !== 99)
            return res.redirect('/')
        var content = '../pages/history'
        return res.render('layouts/main',{content, name:req.session.name, token:req.session.token, position:req.session.position})
    }

    historyDetail = (req, res)=>{
        if(!req.session.username)
            return res.redirect('/staff/login')
        if(req.session.position !== 99)
            return res.redirect('/')
        var content = '../pages/historyDetail'
        return res.render('layouts/main',{content, name:req.session.name, token:req.session.token, position:req.session.position})
    }
}

module.exports = new bill