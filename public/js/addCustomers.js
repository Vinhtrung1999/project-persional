let token = localStorage.getItem('token-user')
let btn = document.getElementById('btn')

btn.addEventListener('click', () =>{
    document.getElementById('mess').innerHTML = ""
    document.getElementById('err').innerHTML = ""

    let name = document.getElementById('name').value
    let gender = document.getElementById('gender').value
    let email = document.getElementById('email').value
    let tel = document.getElementById('tel').value
    let CMND = document.getElementById('CMND').value
    if(name && gender && email && tel && CMND){
        fetch('/api/staff/addCustomers', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                name : name,
                gender : gender,
                CMND : CMND,
                phone: tel,
                email: email,
                token: token                           
            })
        })
        .then(req => req.json())
        .then(json => {
            if(json.code === 0){
                document.getElementById('name').value = ''
                document.getElementById('CMND').value = ''
                document.getElementById('tel').value = ''
                document.getElementById('email').value = ''
                document.getElementById('gender').value = 0
                document.getElementById('mess').innerHTML = 'add '+CMND+' succeed'
            }  
            else
                document.getElementById('err').innerHTML = 'please check information again'
        })
        .catch(e => console.log(e))
    }
    else
        document.getElementById('err').innerHTML = 'please check information again'
})