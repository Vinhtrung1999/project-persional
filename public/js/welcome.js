fetch(`/api/svd/getSvd`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
})
.then(data => data.json())
.then(data => {
    if(data.code === 0){
        let stadium_std = document.getElementById('stadium-std')
        let stadium_vip = document.getElementById('stadium-vip')
        let items = data.data
        let tmp_std = ''
        let tmp_vip = ''

        items.forEach((val, index) => {
            if(val.type == 0){
                tmp_std += `<div class="std-1-items">
                                <img src="${val.image}" width="500px" height="250px" draggable="false">
                                <a class="action-login-link" href="/view-details?idSvd=${val.idSvd}&type=${val.type}">
                                    <div class="std-1-items-info text-center">${val.name} | <span id="money">${val.price.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span></div>
                                </a>
                            </div>`
            }
            else{
                tmp_vip += `<div class="std-1-items">
                                <img src="${val.image}" width="500px" height="250px" draggable="false">
                                <a class="action-login-link" href="/view-details?idSvd=${val.idSvd}&type=${val.type}">
                                    <div class="std-1-items-info text-center">${val.name} | <span id="money">${val.price.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span></div>
                                </a>
                            </div>`
            }
        })

        stadium_std.innerHTML = tmp_std
        stadium_vip.innerHTML = tmp_vip
    }
})
.catch(err => console.log(err))

let slider = document.getElementsByClassName('slider')
let pos1 = {left: 0, x: 0}
let flag1 = false
// slder 1
slider[0].addEventListener('mousedown', (e) => {
    flag1 = true
    slider[0].style.cursor = "grabbing"
    pos1 = {
        left: slider[0].scrollLeft,
        x: e.clientX
    }
    slider[0].addEventListener('mouseup', mouseUp1)
    slider[0].addEventListener('mousemove', mouseMove1)
})

let mouseUp1 = (e) => {
    flag1 = false
    slider[0].style.cursor = 'grab'
}

let mouseMove1 = (e) => {
    if(flag1){
        let dx = e.clientX - pos1.x
        slider[0].scrollLeft = pos1.left - dx
    }
}

// slder 2
let pos2 = {left: 0, x: 0}
let flag2 = false
slider[1].addEventListener('mousedown', (e) => {
    flag2 = true
    slider[1].style.cursor = "grabbing"
    pos2 = {
        left: slider[1].scrollLeft,
        x: e.clientX
    }
    slider[1].addEventListener('mouseup', mouseUp2)
    slider[1].addEventListener('mousemove', mouseMove2)
})

let mouseUp2 = (e) => {
    flag2 = false
    slider[1].style.cursor = 'grab'
}

let mouseMove2 = (e) => {
    if(flag2){
        let dx = e.clientX - pos2.x
        slider[1].scrollLeft = pos2.left - dx
    }
}
