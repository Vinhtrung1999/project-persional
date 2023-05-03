let token = localStorage.getItem('token-user')
var btn = document.getElementById('btn')

btn.addEventListener('click', () => {
    document.getElementById('err').innerHTML = ''
    document.getElementById('mess').innerHTML = ''

    var idTTB = String(Math.floor(Math.random() * (99999999 - 10000000 + 1)))
    var name = document.getElementById('name').value
    var priceIn = document.getElementById('priceIn').value
    var qty = document.getElementById('qty').value

    if (idTTB && name && priceIn && qty) {
        fetch('/api/equipment/addTTB', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                token: localStorage.getItem('token-user'),
            },
            body: JSON.stringify({
                idTTB: idTTB,
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
                    document.getElementById('mess').innerHTML = 'add ' + idTTB + ' succeed'
                }
                else
                    document.getElementById('err').innerHTML = "please check information again"
            })
            .catch(e => console.log(e))
    }
    else
        document.getElementById('err').innerHTML = "please check information again"
})