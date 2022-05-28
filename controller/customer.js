class customer {
    login = (req, res) =>{
        if(req.session.username)
            return res.redirect('/')
        return res.render('pages/loginCus')
    }

    destroySS = (req, res) => {
        req.session.destroy()
        return res.redirect('/')
    }

//only staff 
    listCustomer = (req, res)=>{
        if(!req.session.username)
            return res.redirect('/staff/login')
        if(req.session.position !== 1)
            return res.redirect('/')
        var content = '../pages/listCustomers'
        return res.render('layouts/main',{content, name:req.session.name, token:req.session.token, position:req.session.position})
    }

    customerDetail = (req, res) => {
        if(!req.session.username)
            return res.redirect('/staff/login')
        if(req.session.position !== 1)
            return res.redirect('/')
        var content = '../pages/CusDT'
        return res.render('layouts/main',{content, name:req.session.name, token:req.session.token, position:req.session.position})
    }

    addCustomer = (req, res)=>{
        if(!req.session.username)
            return res.redirect('/staff/login')
        if(req.session.position !== 1)
            return res.redirect('/')
        var content = '../pages/addCustomers'
        return res.render('layouts/main',{content, name:req.session.name, token:req.session.token, position:req.session.position})
    }
}

module.exports = new customer