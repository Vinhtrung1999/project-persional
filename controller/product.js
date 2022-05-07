class product{
    listProduct = (req, res)=>{
        if(!req.session.username)
            return res.redirect('/staff/login')
        if(req.session.position !== 2 && req.session.position !== 1)
            return res.redirect('/')
        var content = '../pages/listProducts'
        return res.render('layouts/main',{content, name:req.session.name, token:req.session.token, position:req.session.position})
    }

    productDetail = (req, res)=>{
        if(!req.session.username)
            return res.redirect('/staff/login')
        if(req.session.position !== 2 && req.session.position !== 1)
            return res.redirect('/')
        var content = '../pages/ProDetail'
        return res.render('layouts/main',{content, name:req.session.name, token:req.session.token, position:req.session.position})
    }

    addProduct = (req, res)=>{
        if(!req.session.username)
            return res.redirect('/staff/login')
        if(req.session.position !== 2)
            return res.redirect('/')
        var content = '../pages/addProduct'
        return res.render('layouts/main',{content, name:req.session.name, token:req.session.token, position:req.session.position})
    }
}

module.exports = new product