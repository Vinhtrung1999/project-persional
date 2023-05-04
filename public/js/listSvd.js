let token = localStorage.getItem('token-user')
let list_stadium = []

fetch(`/api/svd/getSvd`, {
    method: "GET",
    headers: {
        'Content-Type': 'application/json',
        token: localStorage.getItem('token-user'),
    },
})
    .then(req => req.json())
    .then(json => {
        if (json.code === 0) {
            let data = json.data
            let content_stadium = document.getElementById('content-stadium')
            let tmp = ''
            data.forEach((val, index) => {
                list_stadium.push(val)
                tmp += `<a href="/svd/svdDetail?idSvd=${val.idSvd}" class="tag-link">
                                <div class="content-item ${index % 2 == 0 ? 'bg-grey cl-white' : ''}">
                                    <div class="item item-1">${val.idSvd}</div>
                                    <div class="item item-2">${val.name}</div>
                                    <div class="item item-3">${val.capacity}</div>
                                    <div class="item item-4">${val.price.toLocaleString('vi', { style: 'currency', currency: 'VND' }) + "/h"}</div>
                                    <div class="item item-5">${!val.status ? '<i class="fa-solid fa-circle-check cl-green"></i>' : '<i class="fa-solid fa-circle-xmark cl-red"></i>'}</div>
                                </div>
                            </a>`
                content_stadium.innerHTML = tmp
            });
        }
    })
    .catch(e => console.log(e))


let search = document.getElementById('search')
search.addEventListener('keyup', (e) => {
    let words = e.target.value
    let count_cl = 0
    let temp = ''
    let content_stadium = document.getElementById('content-stadium')
    list_stadium.forEach(val => {
        if (val.name.toLowerCase().indexOf(words.toLowerCase()) != -1) {
            temp += `<a href="/svd/svdDetail?idSvd=${val.idSvd}" class="tag-link">
                            <div class="content-item ${count_cl % 2 == 0 ? 'bg-grey cl-white' : ''}">
                                <div class="item item-1">${val.idSvd}</div>
                                <div class="item item-2">${val.name}</div>
                                <div class="item item-3">${val.capacity}</div>
                                <div class="item item-4">${val.price.toLocaleString('vi', { style: 'currency', currency: 'VND' }) + "/h"}</div>
                                <div class="item item-5 cl-green">${val.status == 0 ? '' : '<i class="fa-solid fa-check"></i>'}</div>
                            </div>
                        </a>`
            count_cl++
        }

    })
    content_stadium.innerHTML = temp
})
