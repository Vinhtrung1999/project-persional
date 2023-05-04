let token = localStorage.getItem('token-user')
let list_bill = []

fetch(`/api/bill/getBills`, {
    method: "GET",
    headers: {
        'Content-Type': 'application/json',
        token: localStorage.getItem('token-user'),
    }
})
    .then(req => req.json())
    .then(json => {
        console.log(json)
        let data = json.data
        let content_bill = document.getElementById('content-bill')
        let temp = ''
        data.forEach((val, index) => {
            list_bill.push(val)
            temp += `<a href="/bill/billDetail?idBill=${val.idBill}" class="tag-link">
                        <div class="content-item ${index % 2 == 0 ? 'bg-grey cl-white' : ''}">
                            <div class="item item-1">${val.idBill}</div>
                            <div class="item item-2">${val.dateOrder}</div>
                            <div class="item item-3">${val.sum.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</div>
                        </div>
                    </a>`
        })
        content_bill.innerHTML = temp

    })
    .catch(e => console.log(e))

let search = document.getElementById('search')
search.addEventListener('keyup', (e) => {
    let words = e.target.value
    let count_cl = 0
    let temp = ''
    let content_bill = document.getElementById('content-bill')
    list_bill.forEach(val => {
        if (val.idBill.toLowerCase().indexOf(words.toLowerCase()) != -1) {
            temp += `<a href="/bill/billDetail?idBill=${val.idBill}" class="tag-link">
                                <div class="content-item ${count_cl % 2 == 0 ? 'bg-grey cl-white' : ''}">
                                    <div class="item item-1">${val.idBill}</div>
                                    <div class="item item-2">${val.dateOrder}</div>
                                    <div class="item item-3">${val.sum.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</div>
                                </div>
                            </a>`
            count_cl++
        }

    })
    content_bill.innerHTML = temp
})