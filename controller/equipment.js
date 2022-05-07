class equipment {
    listEquipment = (req, res)=>{
        if(!req.session.username)
            return res.redirect('/staff/login')
        if(req.session.position !== 2)
            return res.redirect('/')
        var content = '../pages/listTTB'
        return res.render('layouts/main',{content, name:req.session.name, token:req.session.token, position:req.session.position})
    }

    listEquipmentDamage = (req, res)=>{
        if(!req.session.username)
            return res.redirect('/staff/login')
        if(req.session.position !== 2)
            return res.redirect('/')
        var content = '../pages/listTTBBr'
        return res.render('layouts/main',{content, name:req.session.name, token:req.session.token, position:req.session.position})
    }

    equipmentDamageDetail = (req, res)=>{
        if(!req.session.username)
            return res.redirect('/staff/login')
        if(req.session.position !== 2)
            return res.redirect('/')
        var content = '../pages/TTBBrDetail'
        return res.render('layouts/main',{content, name:req.session.name, token:req.session.token, position:req.session.position})
    }

    equipmentDetail = (req, res)=>{
        if(!req.session.username)
            return res.redirect('/staff/login')
        if(req.session.position !== 2)
            return res.redirect('/')
        var content = '../pages/TTBDetail'
        return res.render('layouts/main',{content, name:req.session.name, token:req.session.token, position:req.session.position})
    }

    addEquipment = (req, res)=>{
        if(!req.session.username)
            return res.redirect('/staff/login')
        if(req.session.position !== 2)
            return res.redirect('/')
        var content = '../pages/addTTB'
        return res.render('layouts/main',{content, name:req.session.name, token:req.session.token, position:req.session.position})
    }
}

module.exports = new equipment