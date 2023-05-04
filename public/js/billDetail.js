let url = new URL(window.location)
let token = localStorage.getItem('token-user')
let idBill = url.searchParams.get('idBill')

fetch(`/api/bill/getBills/${idBill}/?token=${token}`, {
    method: "GET",
    headers: {
        'Content-Type': 'application/json',
        token: localStorage.getItem('token-user'),
    },
})
    .then(req => req.json())
    .then(json => {
        if (json.code === 0) {
            let data = json.data[0]
            let idBill = document.getElementById('idBill')
            let idCus = document.getElementById('idCus')
            let idStaff = document.getElementById('idStaff')
            let dateOrder = document.getElementById('dateOrder')
            let sum = document.getElementById('sum')
            let dateUse = document.getElementById('dateUse')
            let listSvd = document.getElementById('listSvd')
            let listPro = document.getElementById('listPro')

            idBill.innerHTML = data.idBill
            idCus.innerHTML = data.idCus
            idStaff.innerHTML = data.idStaff
            dateOrder.innerHTML = data.dateOrder
            sum.innerHTML = data.sum.toLocaleString('vi', { style: 'currency', currency: 'VND' })
            dateUse.innerHTML = data.dateUse

            if (data.listSvd.length) {
                let list_stadium = document.getElementById('list-stadium')
                let temp = ''
                data.listSvd.forEach((val, index) => {
                    temp += `<div class="list-item">
                            <div class="list-item-stt">${index + 1}</div>
                            <div class="list-item-item-1">${val.idSvd}</div>
                            <div class="list-item-item-2">${parseInt(val.price).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</div>
                        </div>`
                })
                list_stadium.innerHTML = temp
            }

            if (data.listProducts.length) {
                let temp = ''
                let list_product = document.getElementById('list-product')

                data.listProducts.forEach((val, index) => {
                    temp += `<div class="list-item">
                            <div class="list-item-stt">${index + 1}</div>
                            <div class="list-item-item-1">${val.name}</div>
                            <div class="list-item-item-2">${val.qty}</div>
                            <div class="list-item-item-3">${parseInt(val.price * val.qty).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</div>
                        </div>`
                })
                list_product.innerHTML = temp
            }
            document.getElementById('head').innerHTML = data.idBill
        }
    })
    .catch(e => console.log(e))