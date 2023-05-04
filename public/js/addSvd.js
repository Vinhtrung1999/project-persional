let token = localStorage.getItem('token-user')
let btn = document.getElementById('btn')

btn.addEventListener('click', () => {
    document.getElementById('mess').innerHTML = ""
    document.getElementById('err').innerHTML = ""

    let name = document.getElementById('name').value
    let status = document.getElementById('status').value
    let type = document.getElementById('type').value
    let capacity = document.getElementById('capacity').value
    let image = document.getElementById('image').value
    let image_detail_1 = document.getElementById('image_detail_1').value
    let image_detail_2 = document.getElementById('image_detail_2').value
    let price = document.getElementById('price').value

    if (name && type && capacity && type && image) {
        fetch('/api/svd/addSvd', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                token: localStorage.getItem('token-user'),
            },
            body: JSON.stringify({
                name: name,
                type: type,
                capacity: capacity,
                status: status,
                image: image,
                image_detail_1: image_detail_1,
                image_detail_2: image_detail_2,
                price: price,
                token: token
            })
        })
            .then(req => req.json())
            .then(json => {
                if (json.code === 0) {
                    document.getElementById('name').value = ''
                    document.getElementById('status').value = 0
                    document.getElementById('type').value = 0
                    document.getElementById('capacity').value = ''
                    document.getElementById('image').value = ''
                    document.getElementById('image_detail_1').value = ''
                    document.getElementById('image_detail_2').value = ''
                    document.getElementById('price').value = ''


                    document.getElementById('mess').innerHTML = 'add stadium successfully'
                }
                else
                    document.getElementById('err').innerHTML = 'please check information again'
            })
            .catch(e => console.log(e))
    }
    else
        document.getElementById('err').innerHTML = 'Invalid Information! Please check information again'
})