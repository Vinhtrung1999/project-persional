let url = new URL(window.location)
let idStaff = url.searchParams.get('idStaff')
let btn = document.getElementById('btn')
let btn_delete = document.getElementById("btn_delete")
let btn_show_update = document.getElementById('btn-show-update')
let btn_close_modal = document.getElementById('btn-close-modal')
let token = localStorage.getItem('token-user')

btn_show_update.addEventListener('click', () => {
    let modal = document.getElementById('modal-update')
    modal.style.display = 'block'
})

btn_close_modal.addEventListener('click', () => {
    let modal = document.getElementById('modal-update')
    modal.style.display = 'none'
})

btn.addEventListener('click', ()=>{
    let url = new URL(window.location)
    let idStaff = url.searchParams.get('idStaff')
    
    fetch('/api/staff/resetPass', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                idStaff : idStaff,
                password : idStaff,
                token: token                    
            })
        })
        .then(req => req.json())
        .then(json => {
            if(json.code === 0){
                document.getElementById('success').innerHTML =  json.message
            }  
        })
        .catch(e => console.log(e))
})

fetch(`/api/staff/getStaffs/${idStaff}?token=${token}`, {
    method: "GET",
    headers: {
        'Content-Type': 'application/json'
    },
})
.then(req => req.json())
.then(json => {
    if(json.code === 0){
        data = json.data[0]
        let idStaff = document.getElementById('idStaff')
        let name = document.getElementById('name')
        let age = document.getElementById('age')
        let gender = document.getElementById('gender')
        let shift = document.getElementById('shift')
        let salary = document.getElementById('salary')
        let position = document.getElementById('position')
        let img_avt = document.getElementById('img-avt')
        let img_avt_modal = document.getElementById('img-avt-modal')

        idStaff.innerHTML = data.idStaff
        name.innerHTML = data.name
        age.innerHTML = data.age
        salary.innerHTML = data.salary.toLocaleString('vi', {style : 'currency', currency : 'VND'})
        shift.innerHTML = data.shift

        if(data.gender === 0){
            gender.innerHTML = "Male"
            img_avt.setAttribute('src','/images/staff-m.png')
            img_avt_modal.setAttribute('src','/images/staff-m.png')
        }
        else{
            gender.innerHTML = "Female"
            img_avt.setAttribute('src', '/images/staff-fm.png')
            img_avt_modal.setAttribute('src', '/images/staff-fm.png')
        }
            
        if(data.position === 0)
            position.innerHTML = "Manager"
        else if(data.position === 1)
            position.innerHTML = "Saler"
        else position.innerHTML = "Employee"

    //Modal
        document.getElementById('idStaff_MD').innerHTML = data.idStaff
        document.getElementById('salary_MD').value = data.salary
        document.getElementById('shift_MD').value = data.shift
        document.getElementById('position_MD').value = data.position

    }  
})
.catch(e => console.log(e))

btn_delete.addEventListener('click', ()=>{
    let url = new URL(window.location)
    let idStaff = url.searchParams.get('idStaff')
    
    fetch('/api/staff/deleteStaff', {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                idStaff : idStaff,
                token: token                    
            })
        })
        .then(req => req.json())
        .then(json => {
            if(json.code === 0){
                return window.location.href = "/"
            }  
        })
        .catch(e => console.log(e))
})

let btn_update = document.getElementById('btn_update')

btn_update.addEventListener("click", () =>{
    document.getElementById("err").innerHTML = ''
    let idStaff_MD = document.getElementById('idStaff_MD').innerHTML
    let salary_MD = document.getElementById('salary_MD').value
    let shift_MD = document.getElementById('shift_MD').value
    let position_MD = document.getElementById('position_MD').value

    if (idStaff_MD && salary_MD && shift_MD && position_MD) {
        fetch('/api/staff/updateStaff', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idStaff: idStaff_MD,
                salary: salary_MD,
                position: position_MD,
                shift: shift_MD,
                token: token
            })
        })
            .then(res => res.json())
            .then(json => {
                if (json.code === 0) {
                    return window.location.href = ''
                }
                else
                    document.getElementById('err').innerHTML = "update fail!"
            })
            .catch(err => console.log(err))
    }
    else
        document.getElementById('err').innerHTML = "please check infomation again"
})