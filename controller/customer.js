class customer {
    login = (req, res) =>{
        if(req.session.username)
            return res.redirect('/')
        return res.render('pages/loginCus')
    }

    destroySS = (req, res) => {
        req.session.destroy()
        return res.redirect('/customer/loginCus')
    }
}

module.exports = new customer