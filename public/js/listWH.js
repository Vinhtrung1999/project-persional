let token = localStorage.getItem('token-user')
let list_svd = []

fetch(`/api/warehouse/getProWH?token=${token}`, {
    method: "GET",
    headers: {
        'Content-Type': 'application/json'
    },
})
    .then(req => req.json())
    .then(json => {
        let data = json.data
        let content_warehouse = document.getElementById('content-warehouse')
        let tmp = ''
        if(json.code === 0){          
            data.forEach((val, index) => {
                list_svd.push(val)
                tmp += `<a href="/warehouse/WHDetail?idProWH=${val.idProWH}" class="tag-link">
                            <div class="content-item ${index % 2 == 0 ? 'bg-grey cl-white' : ''}">
                                <div class="item item-1">${val.idProWH}</div>
                                <div class="item item-2">${val.name}</div>
                                <div class="item item-3">${val.qty}</div>
                                <div class="item item-4">${val.dateIn}</div>
                            </div>
                        </a>`
            })
            content_warehouse.innerHTML = tmp
        }  

    })
    .catch(e => console.log(e))

    let search = document.getElementById('search')
    search.addEventListener('keyup', (e) => {
        let words = e.target.value
        let count_cl = 0
        let temp = ''
        let content_warehouse = document.getElementById('content-warehouse')
        list_svd.forEach(val => {
            if(val.name.toLowerCase().indexOf(words.toLowerCase()) != -1){
                temp += `<a href="/warehouse/WHDetail?idProWH=${val.idProWH}" class="tag-link">
                            <div class="content-item ${count_cl % 2 == 0 ? 'bg-grey cl-white' : ''}">
                                <div class="item item-1">${val.idProWH}</div>
                                <div class="item item-2">${val.name}</div>
                                <div class="item item-3">${val.qty}</div>
                                <div class="item item-4">${val.dateIn}</div>
                            </div>
                        </a>`
                count_cl ++
            }

        })
        content_warehouse.innerHTML = temp
    })
