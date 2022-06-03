var url = new URL(window.location)
var idCus = url.searchParams.get('idCus')
let token = localStorage.getItem('token-user')

fetch(`/api/staff/getCus/${idCus}?token=${token}`, {
    method: "GET",
    headers: {
        'Content-Type': 'application/json'
    },
})
.then(req => req.json())
.then(json => {
    if(json.code === 0){
        data = json.data[0]
        var idCus = document.getElementById('idCus')
        var name = document.getElementById('name')
        var CMND = document.getElementById('CMND')
        var gender = document.getElementById('gender')
        var email = document.getElementById('email')
        var tel = document.getElementById('tel')

        idCus.innerHTML = data.idCus
        name.innerHTML = data.name
        tel.innerHTML = data.phone
        email.innerHTML = data.email
        CMND.innerHTML = data.CMND

        if(data.gender === 0){
            gender.innerHTML = "Male"
            document.getElementById('img-logo').setAttribute('src', '/images/cus-m.png')
        }
        else{
            gender.innerHTML = "Femail"
            document.getElementById('img-logo').setAttribute('src', '/images/cus-fm.png')
        }
        document.getElementById('head').innerHTML = data.idCus
    }  
})
.catch(e => console.log(e))