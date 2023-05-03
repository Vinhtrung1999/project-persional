let url = new URL(window.location)
let idProWH = url.searchParams.get('idProWH')
let token = localStorage.getItem('token-user')

let btn_show_modal = document.getElementById('btn-show-modal')
let btn_close_modal = document.getElementById('btn-close-modal')

btn_show_modal.addEventListener('click', () => {
    document.getElementById('myModal').style.display = 'block'
})

btn_close_modal.addEventListener('click', () => {
    document.getElementById('myModal').style.display = 'none'
})

fetch(`/api/warehouse/getProWH/${idProWH}?token=${token}`, {
    method: "GET",
    headers: {
        'Content-Type': 'application/json',
        token: localStorage.getItem('token-user'),
    },
})
    .then(req => req.json())
    .then(json => {
        console.log(json)
        if (json.code === 0) {
            data = json.data[0]
            console.log(data)
            var idProWH = document.getElementById('idProWH')
            var name = document.getElementById('name')
            var type = document.getElementById('type')
            var qty = document.getElementById('qty')
            var price = document.getElementById('price')
            var priceIn = document.getElementById('priceInput')
            var date = document.getElementById('date')

            idProWH.innerHTML = data.idProWH
            name.innerHTML = data.name
            qty.innerHTML = data.qty
            price.innerHTML = parseInt(data.price).toLocaleString('vi', { style: 'currency', currency: 'VND' })
            priceIn.innerHTML = parseInt(data.priceIn).toLocaleString('vi', { style: 'currency', currency: 'VND' })
            date.innerHTML = data.dateIn

            if (data.type === 0)
                type.innerHTML = "Drink"
            else if (data.type === 1)
                type.innerHTML = "Food"
            else
                type.innerHTML = "Item"

            document.getElementById('head').innerHTML = data.idProWH

            var idProWH_MD = document.getElementById('idProWH_MD')
            var price_MD = document.getElementById('price_MD')

            idProWH_MD.innerHTML = data.idProWH
            price_MD.value = data.price
        }
    })
    .catch(e => console.log(e))

var btn_update = document.getElementById('btn_update')

btn_update.addEventListener("click", () => {
    document.getElementById('err').innerHTML = ""
    var idProWH_MD = document.getElementById('idProWH_MD').innerHTML
    var price_MD = document.getElementById('price_MD').value

    if (idProWH_MD && price_MD) {
        fetch('/api/warehouse/updatePriceProWH', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                token: localStorage.getItem('token-user'),
            },
            body: JSON.stringify({
                token: token,
                idProWH: idProWH_MD,
                price: price_MD
            })
        })
            .then(res => res.json())
            .then(json => {
                if (json.code === 0)
                    return window.location.href = ""
                else
                    document.getElementById('err').innerHTML = "update fail"
            })
    } else
        document.getElementById('err').innerHTML = "please check information again"
})

var btn_delete = document.getElementById('btn_delete')

btn_delete.addEventListener("click", () => {
    var url = new URL(window.location)
    var idProWH = url.searchParams.get('idProWH')

    fetch('/api/warehouse/deleteWH', {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            token: localStorage.getItem('token-user'),
        },
        body: JSON.stringify({
            token: token,
            idProWH: idProWH
        })
    })
        .then(req => req.json())
        .then(json => {
            if (json.code === 0) {
                return window.location.href = "/warehouse/listWH"
            }
        })
        .catch(e => console.log(e))
})
