let url = new URL(window.location)
let idPro = url.searchParams.get('idPro')
let token = localStorage.getItem('token-user')

fetch(`/api/product/getPro/${idPro}?token=${token}`, {
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
            let idPro = document.getElementById('idPro')
            let name = document.getElementById('name')
            let type = document.getElementById('type')
            let qty = document.getElementById('qty')
            let price = document.getElementById('price')
            let date = document.getElementById('date')

            idPro.innerHTML = data.idPro
            name.innerHTML = data.name
            qty.innerHTML = data.qty
            price.innerHTML = data.price.toLocaleString('vi', { style: 'currency', currency: 'VND' })
            date.innerHTML = data.dateIn

            if (data.type === 0) {
                type.innerHTML = "Drink"
                document.getElementById('img-logo').setAttribute('src', '/images/logo-drink.png')
            }

            else if (data.type === 1) {
                type.innerHTML = "Food"
                document.getElementById('img-logo').setAttribute('src', '/images/logo-food.png')

            }

            else {
                type.innerHTML = "Item"
                document.getElementById('img-logo').setAttribute('src', '/images/logo-item.png')
            }


            document.getElementById('head').innerHTML = data.idPro
        }
    })
    .catch(e => console.log(e))


let btn_delete = document.getElementById('btn_delete')
if (btn_delete)
    btn_delete.addEventListener("click", () => {
        let url = new URL(window.location)
        let idPro = url.searchParams.get('idPro')

        fetch('/api/product/deletePro/', {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                token: localStorage.getItem('token-user'),
            },
            body: JSON.stringify({
                token: token,
                idPro: idPro
            })
        })
            .then(req => req.json())
            .then(json => {
                if (json.code === 0) {
                    return window.location.href = "/product/listProducts"
                }
            })
            .catch(e => console.log(e))
    })