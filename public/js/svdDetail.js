let token = localStorage.getItem('token-user')
let btn_update = document.getElementById('btn_update')
let url = new URL(window.location)
let idSvd = url.searchParams.get('idSvd')
let btn_show_modal = document.getElementById('btn-show-modal')
let btn_close_modal = document.getElementById('btn-close-modal')

if (btn_show_modal)
    btn_show_modal.addEventListener('click', () => {
        let myModal = document.getElementById('myModal')
        myModal.style.display = 'block',
            document.getElementById('mess').innerHTML = ''
    })

if (btn_close_modal)
    btn_close_modal.addEventListener('click', () => {
        let myModal = document.getElementById('myModal')
        myModal.style.display = 'none'
    })

fetch(`/api/svd/getSvd/${idSvd}`, {
    method: "GET",
    headers: {
        'Content-Type': 'application/json',
        token: localStorage.getItem('token-user'),
    },
})
    .then(req => req.json())
    .then(json => {
        if (json.code === 0) {
            data = json.data
            let idSvd = document.getElementById('idSvd')
            let name = document.getElementById('name')
            let type = document.getElementById('type')
            let price = document.getElementById('price')
            let capacity = document.getElementById('capacity')
            let status = document.getElementById('status')
            let img_type_svd = document.getElementById('img-type-svd')
            let img_type_svd_MD = document.getElementById('img-type-svd-MD')

            idSvd.innerHTML = data.idSvd
            name.innerHTML = data.name
            if (data.type == 1) {
                type.innerHTML = "VIP"
                img_type_svd.setAttribute('src', '/images/vip.png')
                img_type_svd_MD.setAttribute('src', data.image)
            }
            else {
                type.innerHTML = "normal"
                img_type_svd.setAttribute('src', '/images/normal.png')
                img_type_svd_MD.setAttribute('src', data.image)
            }

            if (data.status === 0)
                status.innerHTML = "empty"
            else
                status.innerHTML = "ordered"
            price.innerHTML = data.price.toLocaleString('vi', { style: 'currency', currency: 'VND' }) + "/h"
            capacity.innerHTML = data.capacity + " people"

            document.getElementById('head').innerHTML = data.idSvd

            let idSvd_MD = document.getElementById('idSvd_MD')
            let name_MD = document.getElementById('name_MD')
            let price_MD = document.getElementById('price_MD')
            let image_MD = document.getElementById('image_MD')
            let image_detail_1_MD = document.getElementById('image_detail_1_MD')
            let image_detail_2_MD = document.getElementById('image_detail_2_MD')
            let capacity_MD = document.getElementById('capacity_MD')
            let type_MD = document.getElementById('type_MD')
            let status_MD = document.getElementById('status_MD')

            idSvd_MD.innerHTML = data.idSvd
            name_MD.innerHTML = data.name
            capacity_MD.value = data.capacity
            price_MD.value = data.price
            image_MD.value = data.image
            image_detail_1_MD.value = data.image_detail_1
            image_detail_2_MD.value = data.image_detail_2
            type_MD.value = data.type
            status_MD.value = data.status
        }
    })
    .catch(e => console.log(e))

btn_update.addEventListener("click", () => {
    document.getElementById('err').innerHTML = ""
    let idSvd_MD = document.getElementById('idSvd_MD').innerHTML
    let price_MD = document.getElementById('price_MD').value
    let capacity_MD = document.getElementById('capacity_MD').value
    let type_MD = document.getElementById('type_MD').value
    let status_MD = document.getElementById('status_MD').value
    let image_MD = document.getElementById('image_MD').value
    let image_detail_1_MD = document.getElementById('image_detail_1_MD').value
    let image_detail_2_MD = document.getElementById('image_detail_2_MD').value

    if (idSvd_MD && price_MD && capacity_MD && type_MD && status_MD && image_MD) {
        fetch('/api/svd/updateSvd', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                token: localStorage.getItem('token-user'),
            },
            body: JSON.stringify({
                idSvd: idSvd_MD,
                type: type_MD,
                capacity: capacity_MD,
                status: status_MD,
                image: image_MD,
                image_detail_1: image_detail_1_MD,
                image_detail_2: image_detail_2_MD,
                price: price_MD,
                token: token
            })
        })
            .then(res => res.json())
            .then(json => {
                if (json.code === 0) {
                    return window.location.href = `/svd/svdDetail?idSvd=${idSvd_MD}&mess=Update ${idSvd_MD} success`
                }
                else
                    document.getElementById('err').innerHTML = "update fail!"
            })
            .catch(err => console.log(err))
    }
    else
        document.getElementById('err').innerHTML = "please check infomation again"

})
