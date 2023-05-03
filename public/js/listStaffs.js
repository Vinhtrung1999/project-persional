let token = localStorage.getItem('token-user')
let list_staffs_temp = []
let search = document.getElementById('search')

fetch(`/api/staff/getStaffs?token=${token}`, {
    method: "GET",
    headers: {
        'Content-Type': 'application/json',
        token: localStorage.getItem('token-user'),
    }
})
    .then(req => req.json())
    .then(json => {
        if (json.code === 0) {
            list_staffs_temp = json.data
            data = json.data
            let list_staff = document.getElementById('list-staff')
            data.forEach((val, index) => {
                let a = document.createElement('a')
                let div1 = document.createElement('div')
                let div2 = document.createElement('div')
                let div3 = document.createElement('div')
                let div4 = document.createElement('div')
                a.setAttribute('href', '/staff/staffDetail?idStaff=' + val.idStaff)
                a.setAttribute('class', 'text-link')
                if (index % 2 === 0)
                    div1.setAttribute('class', 'list-staff-items bg-green cl-white')
                else
                    div1.setAttribute('class', 'list-staff-items')
                div2.setAttribute('class', 'list-staff-item-id')
                div3.setAttribute('class', 'list-staff-item-name')
                div4.setAttribute('class', 'list-staff-item-position')

                // set color


                div2.innerHTML = val.idStaff
                div3.innerHTML = val.name
                if (val.position == 0)
                    div4.innerHTML = "Manager"
                else if (val.position == 1)
                    div4.innerHTML = "Saler"
                else
                    div4.innerHTML = "Employee"

                div1.appendChild(div2)
                div1.appendChild(div3)
                div1.appendChild(div4)
                a.appendChild(div1)



                list_staff.appendChild(a)
            });
        }
    })
    .catch(e => console.log(e))

search.addEventListener('keyup', (e) => {
    let list_staff_2 = document.getElementById('list-staff')
    let word = e.target.value
    let temp = []
    let tag = ''
    let color = 0
    list_staffs_temp.forEach((val, index) => {
        if (val.name.toLowerCase().indexOf(word.toLowerCase()) != -1) {
            tag += `<a class="text-link" href="/staff/staffDetail?idStaff=${val.idStaff}">
                        <div class="${color % 2 == 0 ? 'list-staff-items bg-green cl-white' : 'list-staff-items'}">
                            <div class="list-staff-item-id">${val.idStaff}</div>
                            <div class="list-staff-item-name">${val.name}</div>
                            <div class="list-staff-item-position">${val.position == 0 ? 'Manager' : (val.position == 1 ? 'Saler' : 'Employee')}</div>
                        </div>
                    </a>`
            color++
        }
        list_staff_2.innerHTML = tag

    })
})
