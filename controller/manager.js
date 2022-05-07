class manager {
    profile = (req, res) => {
        if(!req.session.username)
            return res.redirect('/staff/login')
        var content = '../page-managers/profile-manager'
        return res.render('layouts/main',{content, name:req.session.name, token:req.session.token, position:req.session.position})
    }

    staff = (req, res)=>{
        if(!req.session.username)
            return res.redirect('/staff/login')
        if(req.session.position !== 0)
            return res.redirect('/')
        var content = '../page-managers/staff-manager'
        return res.render('layouts/main',{content, name:req.session.name, token:req.session.token, position:req.session.position})
    }

    statistic = (req, res)=>{
        if(!req.session.username)
            return res.redirect('/staff/login')
        if(req.session.position !== 0)
            return res.redirect('/')
        var content = '../page-managers/statistic-manager'
        return res.render('layouts/main',{content, name:req.session.name, token:req.session.token, position:req.session.position})
    }

    stadium = (req, res) => {
        if(!req.session.username)
            return res.redirect('/staff/login')
        if(req.session.position !== 2)
            return res.redirect('/')
        var content = '../page-managers/stadium-manager'
        return res.render('layouts/main',{content, name:req.session.name, token:req.session.token, position:req.session.position})
    }

    product = (req, res) => {
        if(!req.session.username)
            return res.redirect('/staff/login')
        if(req.session.position !== 2)
            return res.redirect('/')
        var content = '../page-managers/product-manager'
        return res.render('layouts/main',{content, name:req.session.name, token:req.session.token, position:req.session.position})
    }

    equipment = (req, res) => {
        if(!req.session.username)
            return res.redirect('/staff/login')
        if(req.session.position !== 2)
            return res.redirect('/')
        var content = '../page-managers/equipment-manager'
        return res.render('layouts/main',{content, name:req.session.name, token:req.session.token, position:req.session.position})
    }

    warehouse = (req, res) => {
        if(!req.session.username)
            return res.redirect('/staff/login')
        if(req.session.position !== 2)
            return res.redirect('/')
        var content = '../page-managers/warehouse-manager'
        return res.render('layouts/main',{content, name:req.session.name, token:req.session.token, position:req.session.position})
    }

    customer = (req, res) => {
        if(!req.session.username)
            return res.redirect('/staff/login')
        if(req.session.position !== 1)
            return res.redirect('/')
        var content = '../page-managers/customer-manager'
        return res.render('layouts/main',{content, name:req.session.name, token:req.session.token, position:req.session.position})
    }

    viewInfo = (req, res) => {
        if(!req.session.username)
            return res.redirect('/staff/login')
        if(req.session.position !== 1)
            return res.redirect('/')
        var content = '../page-managers/view-info-manager'
        return res.render('layouts/main',{content, name:req.session.name, token:req.session.token, position:req.session.position})
    }
}

module.exports = new manager