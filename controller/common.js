const fetch = require('node-fetch')
class ctlCommon{
    welcome = async (req, res) => {
        let name = req.session.name || ''
        let page = 'welcome'
        let getSvd = (url) => {
            return new Promise((resolve, reject) => {
                fetch(url , {
                    method: 'get',
                    headers: {'Content-Type': 'application/json'}
                })
                .then(data => data.json())
                .then(d => resolve(d))
                .catch(err => reject(err))
            })
        }
        
        let data_svd = []
    
        await getSvd('http://localhost:5000/getSvd')
        .then(data => {
            data.data.forEach((val) => {
                data_svd.push(val)
            })
        })
        .catch(err => console.log(err))  
        return res.render('layouts/main-view-customer', {data_svd, name, page})
    }

    home = (req, res) => {
        if(req.session.position === 0)
            return res.redirect('/manager/staff-manager')
        if(req.session.position === 1)
            return res.redirect('/transaction/pay')
        if(req.session.position === 2)   
            return res.redirect('/manager/stadium-manager')
        return res.redirect('/welcome')
    }

    listViewStadiums = (req, res) => {
        let name = req.session.name || ''
        let page = 'list-view-stadium'
        return res.render('layouts/main-view-customer', {name, page})
    }
}

module.exports = new ctlCommon