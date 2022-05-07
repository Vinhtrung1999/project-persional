class statistic {
    fee = (req, res) => {
        if(!req.session.username)
            return res.redirect('/staff/login')
        if(req.session.position !== 0)
            return res.redirect('/')
        var content = '../pages/fee'
        return res.render('layouts/main',{content, name:req.session.name, token:req.session.token, position:req.session.position})
    }

    profit = (req, res)=>{
        if(!req.session.username)
            return res.redirect('/staff/login')
        if(req.session.position !== 0)
            return res.redirect('/')
        var content = '../pages/profit'
        return res.render('layouts/main',{content, name:req.session.name, token:req.session.token, position:req.session.position})
    }
}

module.exports = new statistic