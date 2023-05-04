let token = localStorage.getItem('token-user')
var btn = document.getElementById('btn')

btn.addEventListener('click', () => {
    document.getElementById('err').innerHTML = ''
    document.getElementById('mess').innerHTML = ''

    var name = document.getElementById('name').value
    var priceIn = document.getElementById('priceIn').value
    var qty = document.getElementById('qty').value

    if (name && priceIn && qty) {
        fetch('/api/equipment/addTTB', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                token: localStorage.getItem('token-user'),
            },
            body: JSON.stringify({
                name: name,
                qty: qty,
                priceIn: priceIn,
                token: token
            })
        })
            .then(req => req.json())
            .then(json => {
                if (json.code === 0) {
                    document.getElementById('name').value = ''
                    document.getElementById('qty').value = ''
                    document.getElementById('priceIn').value = ''
                    document.getElementById('mess').innerHTML = 'add equipment successfully'
                }
                else
                    document.getElementById('err').innerHTML = "please check information again"
            })
            .catch(e => console.log(e))
    }
    else
        document.getElementById('err').innerHTML = "please check information again"
})