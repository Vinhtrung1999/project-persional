let token = localStorage.getItem('token-user')
let btn = document.getElementById('btn')

btn.addEventListener('click', ()=>{
    document.getElementById("err").innerHTML = ''
    let password = document.getElementById('password').value
    let confirm_password = document.getElementById('confirm-password').value
    if(password){
        if(confirm_password == password){
            fetch('/api/staff/changePass', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    password : password,
                    token: token                    
                })
            })
            .then(req => req.json())
            .then(json => {
                if(json.code === 0){
                    alert('Change password success, please login again!!')
                    window.location.href = '/staff/destroySS'
                }
                else
                    document.getElementById("err").innerHTML = 'Change password fail!'
            })
            .catch(e => console.log(e))
        }
        else{
            document.getElementById('confirm-password').value = ''
            document.getElementById("err").innerHTML = 'Confirm again'
        }
    }
    else
        document.getElementById("err").innerHTML = 'Please enter new password'
})