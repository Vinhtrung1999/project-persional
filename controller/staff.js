class ctlStaff{
    //[GET]
    //[../staff/profile]
    profile = (req, res)=>{
        if(!req.session.username)
            return res.redirect('/staff/login')
        
        var content = '../pages/profile'
        return res.render('layouts/main',{content, name:req.session.name, token:req.session.token, position:req.session.position})
    }
    
    //[../staff/login]
    login = (req, res) =>{
        if(req.session.username)
            return res.redirect('/')
        return res.render('pages/login')
    }
    
    //[../staff/destroySS]
    destroySS = (req, res) => {
        req.session.destroy()
        return res.redirect('/staff/login')
    }
    
    //[../staff/changePass]
    changePass = (req, res) => {
        if(!req.session.username)
            return res.redirect('/staff/login')
        var content = '../pages/changePass'
        return res.render('layouts/main',{content, name:req.session.name, token:req.session.token, position:req.session.position})
    }
    
    //[../staff/listStaff]
    listStaff = (req, res) => {
        if(!req.session.username)
            return res.redirect('/staff/login')
        if(req.session.position !== 0)
            return res.redirect('/')
        var content = '../pages/listStaffs'
        return res.render('layouts/main',{content, name:req.session.name, token:req.session.token, position:req.session.position})
    }

    //[../staff/staffDetail]
    staffDetail = (req, res)=>{
        if(!req.session.username)
            return res.redirect('/staff/login')
        if(req.session.position !== 0)
            return res.redirect('/')
        var content = '../pages/staffDetail'
        return res.render('layouts/main',{content, name:req.session.name, token:req.session.token, position:req.session.position})
    }

    //[../staff/addStaff]
    addStaff = (req, res)=>{
        if(!req.session.username)
            return res.redirect('/staff/login')
        if(req.session.position !== 0)
            return res.redirect('/')
        var content = '../pages/addStaff'
        return res.render('layouts/main',{content, name:req.session.name, token:req.session.token, position:req.session.position})
    }

    //[POST]
}

module.exports = new ctlStaff