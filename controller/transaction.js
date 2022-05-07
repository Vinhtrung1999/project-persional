class transaction {
    //[../staff/pay]
    pay = (req, res)=>{
        if(!req.session.username)
            return res.redirect('/staff/login')
        if(req.session.position !== 1)
            return res.redirect('/')
        var content = '../pages/pay'
        return res.render('layouts/main',{content, name:req.session.name, token:req.session.token, position:req.session.position})
    }

    confirmOTPcode = (req, res)=>{
        if(!req.session.username)
            return res.redirect('/staff/login')
        if(req.session.position !== 1)
            return res.redirect('/')
        var content = '../pages/confirmOTPcode'
        return res.render('layouts/main',{content, name:req.session.name, token:req.session.token, position:req.session.position})
    }

    OTPwrong = (req, res)=>{
        if(!req.session.username)
            return res.redirect('/staff/login')
        if(req.session.position !== 1)
            return res.redirect('/')
        return res.render('pages/OTPwrong')
    }
}

module.exports = new transaction