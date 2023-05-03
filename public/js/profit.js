let token = localStorage.getItem('token-user')
fetch(`/api/bill/getBills?token=${token}`, {
    method: "GET",
    headers: {
        'Content-Type': 'application/json',
        token: localStorage.getItem('token-user'),
    }
})
    .then(req => req.json())
    .then(json => {
        if (json.code === 0) {
            data = json.data
            let content_profit = document.getElementById('content-profit')
            let total_profit = document.getElementById('total-profit')
            let sum_profit = 0
            let tmp = ''
            data.forEach((val, index) => {
                tmp += `<div class="content-item ${index % 2 == 0 ? 'bg-grey cl-white' : ''}">
                        <div class="item item-1">${val.idBill}</div>
                        <div class="item item-2">${val.idCus}</div>
                        <div class="item item-3">${val.dateOrder}</div>
                        <div class="item item-4">${val.sum.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</div>
                    </div>`
                sum_profit += parseInt(val.sum)
            })
            content_profit.innerHTML = tmp
            total_profit.innerHTML = sum_profit.toLocaleString('vi', { style: 'currency', currency: 'VND' })
        }
    })
    .catch(err => console.log(err))