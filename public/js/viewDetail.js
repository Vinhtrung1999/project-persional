let params = window.location.href.split('?')[1].split('&')

let idSvd = params[0].split('=')[1]
let typeSvd = params[1].split('=')[1]

let list_img_svd = []

fetch(`/api/svd/getSvd/${idSvd}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
})
.then(data => data.json())
.then(data => {
    if(data.code === 0){
        let item = data.data[0]
        let typeSvd = item.type
        list_img_svd.push(item.image)
        list_img_svd.push(item.image_detail_1)
        list_img_svd.push(item.image_detail_2)
        document.getElementById('name').innerHTML = item.name
        document.getElementById('capacity').innerHTML = item.capacity
        item.type ? document.getElementById('type').innerHTML = 'VIP'
                : document.getElementById('type').innerHTML = 'Normal'

        document.getElementById('price').innerHTML = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(item.price)

        if(item.status){
            document.getElementById('status').setAttribute('class', 'detail-item-2 cl-red')
            document.getElementById('status').innerHTML = 'Ordered'
        }
        else{
            document.getElementById('status').setAttribute('class', 'detail-item-2 cl-green')
            document.getElementById('status').innerHTML = 'Available'
        }

        document.getElementById('img-main').setAttribute('src', item.image)
        document.getElementById('img-0').setAttribute('src', item.image)
        document.getElementById('img-1').setAttribute('src', item.image_detail_1)
        document.getElementById('img-2').setAttribute('src', item.image_detail_2)
    }
})
.catch(err => console.log(err))

let img_stadiums = document.querySelectorAll('.img-item')
img_stadiums.forEach(element => {
    element.addEventListener('click', e => {
        // remove active
        document.querySelectorAll('.img-item').forEach(elm =>{
            elm.setAttribute('class', 'img-item')
        })

        //set img & active
        document.querySelector('#img-main').setAttribute('src', list_img_svd[e.target.dataset.stt])
        e.target.setAttribute('class', 'img-item img-active')
    })
})

fetch(`/api/svd/getSvd`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
})
.then(data => data.json())
.then(data => {
    if(data.code === 0){
        let item = data.data
        let recommend_svd = document.getElementById('recommend-svd')
        let tmp = ''
        item.forEach((val, index) => {
            if(parseInt(typeSvd) == val.type)
                tmp += `<div class="std-1-items">
                            <img src="${val.image}" width="500px" height="250px" draggable="false">
                            <a class="action-login-link" href="/view-details?idSvd=${val.idSvd}&type=${val.type}">
                                <div class="std-1-items-info text-center">${val.name}  | <span id="money">${new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(val.price)}</span></div>
                            </a>
                        </div>`
        })

        recommend_svd.innerHTML = tmp
    }
})
.catch(err => console.log(err))


// slider
let slider = document.querySelector('.slider')
let pos = {left: 0, x: 0}
let flag = false

slider.addEventListener('mousedown', (e) => {
    flag = true
    slider.style.cursor = "grabbing"
    pos = {
        left: slider.scrollLeft,
        x: e.clientX
    }
    slider.addEventListener('mouseup', mouseUp)
    slider.addEventListener('mousemove', mouseMove)
})

let mouseUp = (e) => {
    flag = false
    slider.style.cursor = 'grab'
}

let mouseMove = (e) => {
    if(flag){
        let dx = e.clientX - pos.x
        slider.scrollLeft = pos.left - dx
    }
}