let token = localStorage.getItem('token-user')
let btn = document.getElementById('btn')

btn.addEventListener('click', () =>{
    document.getElementById("mess").innerHTML = ''
    document.getElementById("err").innerHTML = ''

    let idStaff = String(Math.floor(Math.random() * (99999999 - 10000000 + 1)))
    let name = document.getElementById('name').value
    let age = document.getElementById('age').value
    let gender = document.getElementById('gender').value
    let shift = document.getElementById('shift').value
    let salary = document.getElementById('salary').value
    let position = document.getElementById('position').value
    if(idStaff && name && gender && age && salary && shift && position){
        fetch('/api/staff/addStaff', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                idStaff : idStaff,
                password : idStaff,
                name : name,
                gender : gender,
                age : age,
                salary: salary,
                shift: shift,
                position: position,
                token: token                            
            })
        })
        .then(req => req.json())
        .then(json => {
            if(json.code === 0){
                document.getElementById('name').value = ''
                document.getElementById('age').value = ''
                document.getElementById('gender').value = 0
                document.getElementById('shift').value = 'Ca1'
                document.getElementById('position').value = 0
                document.getElementById('salary').value = ''
                document.getElementById('mess').innerHTML = 'add '+idStaff+' succeed'
            }else
                document.getElementById('err').innerHTML = 'add new staff fail! Please check infomation again'

        })
        .catch(e => console.log(e))
    }else
        document.getElementById('err').innerHTML = 'please check infomation again'
})