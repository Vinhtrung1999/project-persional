let url = new URL(window.location)
let idTTB_Br = url.searchParams.get('idTTB_Br')    
let token = localStorage.getItem('token-user')

fetch(`/api/equipment/getTTB_Broken/${idTTB_Br}?token=${token}`, {
    method: "GET",
    headers: {
        'Content-Type': 'application/json'
    },
})
.then(req => req.json())
.then(json => {
    if(json.code === 0){
        data = json.data[0]
        let idTTB_Br = document.getElementById('idTTB_Br')
        let idTTB = document.getElementById('idTTB')
        let name = document.getElementById('name')
        let qty = document.getElementById('qty')
        let priceIn = document.getElementById('priceInput')
        let date = document.getElementById('date')

        idTTB_Br.innerHTML = data.idTTB_Br
        idTTB.innerHTML = data.idTTB
        name.innerHTML = data.name
        qty.innerHTML = data.qty
        priceIn.innerHTML = parseInt(data.priceIn).toLocaleString('vi', {style : 'currency', currency : 'VND'})
        date.innerHTML = data.dateIn

        document.getElementById('head').innerHTML = data.idTTB_Br

    }  
})
.catch(e => console.log(e))
