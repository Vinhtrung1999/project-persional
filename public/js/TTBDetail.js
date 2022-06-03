let url = new URL(window.location)
let idTTB = url.searchParams.get('idTTB')    
let btn_show_modal = document.getElementById('btn-show-modal')
let btn_close_modal = document.getElementById('btn-close-modal')
let token = localStorage.getItem('token-user')

btn_show_modal.addEventListener('click', () => {
    document.getElementById('myModal').style.display = 'block'
})

btn_close_modal.addEventListener('click', () => {
    document.getElementById('myModal').style.display = 'none'
})

fetch(`/api/equipment/getTTB/${idTTB}?token=${token}`, {
    method: "GET",
    headers: {
        'Content-Type': 'application/json'
    },
})
.then(req => req.json())
.then(json => {
    if(json.code === 0){
        data = json.data[0]
        let idTTB = document.getElementById('idTTB')
        let name = document.getElementById('name')
        let qty = document.getElementById('qty')
        let priceIn = document.getElementById('priceIn')
        let date = document.getElementById('date')

        idTTB.innerHTML = data.idTTB
        name.innerHTML = data.name
        qty.innerHTML = data.qty
        priceIn.innerHTML = parseInt(data.priceIn).toLocaleString('vi', {style : 'currency', currency : 'VND'})
        date.innerHTML = data.dateIn

        document.getElementById('head').innerHTML = data.idTTB

        let idTTB_MD = document.getElementById('idTTB_MD')
        let qty_MD = document.getElementById('qty_MD')

        idTTB_MD.innerHTML = data.idTTB
        qty_MD.value = data.qty
    }  
})
.catch(e => console.log(e))

let btn_update = document.getElementById('btn_update')

btn_update.addEventListener("click", () => {
    document.getElementById('err').innerHTML = ""
    let idTTB_MD = document.getElementById('idTTB_MD').innerHTML
    let qty_MD = document.getElementById('qty_MD').value

    if(idTTB_MD && qty_MD)
    {
        fetch('/api/equipment/updateTTB_broken', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token : token,
                idTTB : idTTB_MD,
                qty : qty_MD
            })
        })
        .then(res => res.json())
        .then(json => {
            if(json.code === 0)
                return window.location.href = ""
            else
                document.getElementById('err').innerHTML = "update fail"
        })
    }else
        document.getElementById('err').innerHTML = "please check information again"
})

