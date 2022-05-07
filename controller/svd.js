class svd {
    listSvd = (req, res)=>{
        if(!req.session.username)
            return res.redirect('/staff/login')
        if(req.session.position !== 1 && req.session.position !== 2 && req.session.position !== 99)
            return res.redirect('/')
        var content = '../pages/listSvd'
        return res.render('layouts/main',{content, name:req.session.name, token:req.session.token, position:req.session.position})
    }

    svdDetail = (req, res)=>{
        if(!req.session.username)
            return res.redirect('/staff/login')
        if(req.session.position !== 1 && req.session.position !== 2 && req.session.position !== 99)
            return res.redirect('/')
        var content = '../pages/svdDetail'
        return res.render('layouts/main',{content, name:req.session.name, token:req.session.token, position:req.session.position})
    }

    addSvd = (req, res)=>{
        if(!req.session.username)
            return res.redirect('/staff/login')
        if(req.session.position !== 2)
            return res.redirect('/')
        var content = '../pages/addSvd'
        return res.render('layouts/main',{content, name:req.session.name, token:req.session.token, position:req.session.position})
    }
}

module.exports = new svd