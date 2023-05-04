let list_item_stadiums = []

// render list stadium
fetch('/api/svd/getSvd', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        token: localStorage.getItem('token-user'),
    }
})
    .then(data => data.json())
    .then(data => {
        let list_stadiums = document.getElementById('list-stadiums')
        let temp = ''
        if (data.code === 0) {
            let list_svd = data.data
            list_svd.forEach((val, index) => {
                list_item_stadiums.push(val)
                temp += `<div class="list-items">
                            <div class="item-status">
                                ${val.status ? '<i class="fa-solid fa-xmark cl-red"></i>' : '<i class="fa-solid fa-check cl-green"></i>'}
                            </div>
                            <a href="/view-details?idSvd=${val.idSvd}&type=${val.type}" class="link-custom">
                                <div class="list-item-1">
                                    <img src="${val.image}" class="stadium-img" alt="" draggable="false">
                                </div>
                                <div class="list-item-2 f-1-2">
                                    ${val.name} - ${new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(val.price)}/h
                                </div>
                            </a>
                        </div> `

            })
            list_stadiums.innerHTML = temp
        }
    })

//search stadium by name
let search = document.getElementById('search')
search.addEventListener('keyup', (e) => {
    let words = e.target.value
    let list_stadiums = document.getElementById('list-stadiums')
    let tmp = ''
    list_item_stadiums.forEach(val => {
        if (val.name.toLowerCase().indexOf(words.toLowerCase()) != -1) {
            tmp += `<div class="list-items">
                            <div class="item-status">
                                ${val.status ? '<i class="fa-solid fa-xmark cl-red"></i>' : '<i class="fa-solid fa-check cl-green"></i>'}
                            </div>
                            <a href="/view-details?idSvd=${val.idSvd}&type=${val.type}" class="link-custom">
                                <div class="list-item-1">
                                    <img src="${val.image}" class="stadium-img" alt="" draggable="false">
                                </div>
                                <div class="list-item-2 f-1-2">
                                    ${val.name} - ${new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(val.price)}/h
                                </div>
                            </a>
                        </div> `
        }
    })
    list_stadiums.innerHTML = tmp
})

// filter by type
let filter = document.getElementById('filter')
filter.addEventListener('click', () => {
    let type_filter = document.getElementById('type-filter').value
    let list_stadiums = document.getElementById('list-stadiums')

    if (type_filter != 'None') {
        let tmp = ''
        list_item_stadiums.forEach((val, index) => {
            if (val.type == parseInt(type_filter)) {
                tmp += `<div class="list-items">
                                <div class="item-status">
                                    ${val.status ? '<i class="fa-solid fa-xmark cl-red"></i>' : '<i class="fa-solid fa-check cl-green"></i>'}
                                </div>
                                <a href="/view-details?idSvd=${val.idSvd}&type=${val.type}" class="link-custom">
                                    <div class="list-item-1">
                                        <img src="${val.image}" class="stadium-img" alt="" draggable="false">
                                    </div>
                                    <div class="list-item-2 f-1-2">
                                        ${val.name} - ${new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(val.price)}/h
                                    </div>
                                </a>
                            </div> `
            }
        })

        list_stadiums.innerHTML = tmp
    }
    else {
        let tmp = ''
        list_item_stadiums.forEach((val, index) => {
            tmp += `<div class="list-items">
                            <div class="item-status">
                                ${val.status ? '<i class="fa-solid fa-xmark cl-red"></i>' : '<i class="fa-solid fa-check cl-green"></i>'}
                            </div>
                            <a href="/view-details?idSvd=${val.idSvd}&type=${val.type}" class="link-custom">
                                <div class="list-item-1">
                                    <img src="${val.image}" class="stadium-img" alt="" draggable="false">
                                </div>
                                <div class="list-item-2 f-1-2">
                                    ${val.name} - ${new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(val.price)}/h
                                </div>
                            </a>
                        </div> `
        })

        list_stadiums.innerHTML = tmp
    }
})