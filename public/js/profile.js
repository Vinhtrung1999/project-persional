let token = localStorage.getItem('token-user')
fetch(`/api/staff/getProfileAPI`, {
    method: "GET",
    headers: {
        'Content-Type': 'application/json',
        token: localStorage.getItem('token-user'),
    }
})
    .then(req => req.json())
    .then(json => {
        console.log(json)
        if (json.code === 0) {
            data = json.data;
            let idStaff = document.getElementById('idStaff')
            let name = document.getElementById('name')
            let age = document.getElementById('age')
            let gender = document.getElementById('gender')
            let shift = document.getElementById('shift')
            let salary = document.getElementById('salary')
            let position = document.getElementById('position')
            let img_avt = document.getElementById('img-avt')

            idStaff.innerHTML = data.idStaff
            name.innerHTML = data.name
            age.innerHTML = data.age
            salary.innerHTML = data.salary.toLocaleString('vi', { style: 'currency', currency: 'VND' })
            shift.innerHTML = data.shift

            if (data.gender === 0) {
                gender.innerHTML = "Male"
                img_avt.setAttribute('src', 'https://iconape.com/wp-content/png_logo_vector/avatar.png')
            }
            else {
                gender.innerHTML = "Femail"
                img_avt.setAttribute('src', 'https://iconape.com/wp-content/png_logo_vector/avatar-3.png')
            }

            if (data.position === 0)
                position.innerHTML = "Manager"
            else if (data.position === 1)
                position.innerHTML = "Saler"
            else position.innerHTML = "Employee"
        }
    })
    .catch(e => console.log(e))