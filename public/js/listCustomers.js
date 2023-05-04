let list_customer = []
let token = localStorage.getItem('token-user')

fetch(`/api/staff/getCus?token=${token}`, {
    method: "GET",
    headers: {
        'Content-Type': 'application/json',
        token: localStorage.getItem('token-user'),
    }
})
    .then(req => req.json())
    .then(json => {
        data = json.data
        let content_customer = document.getElementById('content-customer')
        let tmp = ''
        data.forEach((val, index) => {
            list_customer.push(val)
            tmp += `<a href="/customer/CusDT?idCus=${val.idCus}" class="tag-link">
                            <div class="content-item ${index % 2 == 0 ? 'bg-grey cl-white' : ''}">
                                <div class="item item-1">${val.idCus}</div>
                                <div class="item item-2">${val.name}</div>
                                <div class="item item-3">${val.phone}</div>
                            </div>
                        </a>`
        })

        content_customer.innerHTML = tmp

    })
    .catch(e => console.log(e))

let search = document.getElementById('search')
search.addEventListener('keyup', (e) => {
    let words = e.target.value
    let count_cl = 0
    let temp = ''
    let content_customer = document.getElementById('content-customer')
    list_customer.forEach(val => {
        if (val.name.toLowerCase().indexOf(words.toLowerCase()) != -1) {
            temp += `<a href="/customer/CusDT?idCus=${val.idCus}" class="tag-link">
                                <div class="content-item ${count_cl % 2 == 0 ? 'bg-grey cl-white' : ''}">
                                    <div class="item item-1">${val.idCus}</div>
                                    <div class="item item-2">${val.name}</div>
                                    <div class="item item-3">${val.phone}</div>
                                </div>
                            </a>`
            count_cl++
        }

    })
    content_customer.innerHTML = temp
})
