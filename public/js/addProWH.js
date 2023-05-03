let token = localStorage.getItem('token-user')
var btn = document.getElementById('btn')

btn.addEventListener('click', () => {
    document.getElementById('err').innerHTML = ''
    document.getElementById('mess').innerHTML = ''

    var name = document.getElementById('name').value
    var type = document.getElementById('type').value
    var priceIn = document.getElementById('priceIn').value
    var price = document.getElementById('price').value
    var qty = document.getElementById('qty').value

    if (name && priceIn && type && qty && price) {
        fetch('/api/warehouse/addWh', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                token: localStorage.getItem('token-user'),
            },
            body: JSON.stringify({
                name: name,
                type: type,
                qty: qty,
                priceIn: priceIn,
                price: price,
                token: token
            })
        })
            .then(req => req.json())
            .then(json => {
                if (json.code === 0) {
                    document.getElementById('name').value = ''
                    document.getElementById('qty').value = ''
                    document.getElementById('price').value = ''
                    document.getElementById('priceIn').value = ''
                    document.getElementById('type').value = 0
                    document.getElementById('mess').innerHTML = 'add successfully'
                }
                else
                    document.getElementById('err').innerHTML = "please check information again"
            })
            .catch(e => console.log(e))
    }
    else
        document.getElementById('err').innerHTML = "please check information again"
})