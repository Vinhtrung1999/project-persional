let token = localStorage.getItem('token-user')
let list_equipmentBr = []

fetch(`/api/equipment/getTTB_Broken?token=${token}`, {
    method: "GET",
    headers: {
        'Content-Type': 'application/json',
        token: localStorage.getItem('token-user'),
    }
})
    .then(req => req.json())
    .then(json => {
        if (json.code === 0) {
            let data = json.data
            let content_equipmentBr = document.getElementById('content-equipmentBr')
            let temp = ''
            data.forEach((val, index) => {
                list_equipmentBr.push(val)
                temp += `<a href="/equipment//equipmentDamageDetail?idTTB_Br=${val.idTTB_Br}" class="tag-link">
                            <div class="content-item ${index % 2 == 0 ? 'bg-grey cl-white' : ''}">
                                <div class="item item-1">${val.idTTB}</div>
                                <div class="item item-2">${val.name}</div>
                                <div class="item item-3">${val.qty}</div>
                                <div class="item item-4">${val.dateIn?.split('T')?.[0]}</div>
                            </div>
                        </a>`
            })
            content_equipmentBr.innerHTML = temp
        }
    })
    .catch(e => console.log(e))

let search = document.getElementById('search')
search.addEventListener('keyup', (e) => {
    let words = e.target.value
    let count_cl = 0
    let tmp = ''
    let content_equipmentBr = document.getElementById('content-equipmentBr')
    list_equipmentBr.forEach(val => {
        if (val.name.toLowerCase().indexOf(words.toLowerCase()) != -1) {
            tmp += `<a href="/equipment//equipmentDamageDetail?idTTB_Br=${val.idTTB_Br}" class="tag-link">
                            <div class="content-item ${count_cl % 2 == 0 ? 'bg-grey cl-white' : ''}">
                                <div class="item item-1">${val.idTTB}</div>
                                <div class="item item-2">${val.name}</div>
                                <div class="item item-3">${val.qty}</div>
                                <div class="item item-4">${val.dateIn?.split('T')?.[0]}</div>
                            </div>
                        </a>`
            count_cl++
        }

    })
    content_equipmentBr.innerHTML = tmp
})
