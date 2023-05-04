let token = localStorage.getItem('token-user')
let list_product = []
fetch(`/api/product/getPro?token=${token}`, {
    method: "GET",
    headers: {
        'Content-Type': 'application/json',
        token: localStorage.getItem('token-user'),
    },
})
    .then(req => req.json())
    .then(json => {
        let data = json.data
        let content_product = document.getElementById('content-product')
        let tmp = ''
        if (json.code === 0) {
            data.forEach((val, index) => {
                list_product.push(val)
                tmp += `<a href="/product/ProDetail?idPro=${val.idPro}" class="tag-link">
                            <div class="content-item ${index % 2 == 0 ? 'bg-grey cl-white' : ''}">
                                <div class="item item-1">${val.idPro}</div>
                                <div class="item item-2">${val.name}</div>
                                <div class="item item-3">${val.qty}</div>
                                <div class="item item-4">${val.price.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</div>
                            </div>
                        </a>`
            })
            content_product.innerHTML = tmp
        }

    })
    .catch(e => console.log(e))

let search = document.getElementById('search')
search.addEventListener('keyup', (e) => {
    let words = e.target.value
    let count_cl = 0
    let temp = ''
    let content_product = document.getElementById('content-product')
    list_product.forEach(val => {
        if (val.name.toLowerCase().indexOf(words.toLowerCase()) != -1) {
            temp += `<a href="/product/ProDetail?idPro=${val.idPro}" class="tag-link">
                            <div class="content-item ${count_cl % 2 == 0 ? 'bg-grey cl-white' : ''}">
                                <div class="item item-1">${val.idPro}</div>
                                <div class="item item-2">${val.name}</div>
                                <div class="item item-3">${val.qty}</div>
                                <div class="item item-4">${val.price.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</div>
                            </div>
                        </a>`
            count_cl++
        }

    })
    content_product.innerHTML = temp
})
