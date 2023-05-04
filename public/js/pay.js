let token = localStorage.getItem('token-user')
let url = new URL(window.location)
let mess = url.searchParams.get('mess')
if (mess)
    alert(mess)

document.getElementById('idBill').innerHTML = Math.floor(Math.random() * (10000000 - 1000000)) + 100000
const date = new Date()
document.getElementById('date').innerHTML = (date.getFullYear()).toString() + "-" + String(date.getMonth() + 1).padStart(2, '0') + "-" + String(date.getDate()).padStart(2, '0')
document.getElementById('dateOrder').value = (date.getFullYear()).toString() + "-" + String(date.getMonth() + 1).padStart(2, '0') + "-" + String(date.getDate()).padStart(2, '0')
let btnCheck = document.getElementById('btnCheck')
let pay = document.getElementById('pay')
let btnAdd = document.getElementById('btnAdd')
let btnAddPr = document.getElementById('btnAddPr')
let count = 0
let countPr = 0

function removeTr(idtr) {
    document.getElementById(idtr).remove()
}

btnCheck.addEventListener('click', () => {
    document.getElementById("err2").innerHTML = ''
    document.getElementById('payArea').style.display = "none"

    let idCus = document.getElementById('idCus').value
    if (idCus) {
        document.getElementById('payArea').style.display = "none"
        fetch(`/api/staff/getCus/${idCus}?token=${token}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                token: localStorage.getItem('token-user'),
            }
        })
            .then(req => req.json())
            .then(json => {
                if (json.code === 0) {
                    document.getElementById('payArea').style.display = "block"
                } else
                    document.getElementById("err2").innerHTML = "id customer not exist"
            })
            .catch(e => console.log(e))
    }
    else document.getElementById("err2").innerHTML = 'please enter id Customer before pay any thing'

})

btnAdd.addEventListener('click', () => {
    document.getElementById('messAddSvd').innerHTML = ''
    let idsvd = document.getElementById('idsvdSearch').value
    if (idsvd) {
        fetch(`/api/svd/getSvd/${idsvd}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                token: localStorage.getItem('token-user'),
            }
        })
            .then(req => req.json())
            .then(json => {
                console.log(json)
                if (json.code === 0 && json.data.status === 0) {
                    if (count != 0) {
                        for (let i = 1; i <= count; i++) {
                            if (document.getElementById('sdvOrder' + i).innerHTML === json.data.idSvd)
                                return
                        }
                    }
                    count += 1
                    let tb = document.getElementById('tb')
                    let data = json.data

                    let tr = document.createElement('tr')
                    let td1 = document.createElement('td')
                    let td2 = document.createElement('td')
                    let td3 = document.createElement('td')
                    let td4 = document.createElement('td')
                    let td5 = document.createElement('td')

                    let btn = document.createElement('button')
                    btn.setAttribute('class', 'btnR')
                    btn.setAttribute('onclick', "return removeTr('tr" + count + "')")
                    btn.innerHTML = 'x'

                    td1.innerHTML = data.idSvd
                    td2.innerHTML = data.name
                    td3.innerHTML = data.capacity
                    td4.innerHTML = data.price
                    td2.setAttribute('id', 'nameSvd' + count)
                    td4.setAttribute('id', 'idPriceSvd' + count)
                    td5.appendChild(btn)

                    tr.setAttribute('id', 'tr' + count)
                    td1.setAttribute('id', 'sdvOrder' + count)

                    tr.appendChild(td1)
                    tr.appendChild(td2)
                    tr.appendChild(td3)
                    tr.appendChild(td4)
                    tr.appendChild(td5)

                    tb.appendChild(tr)

                    document.getElementById('idsvdSearch').value = ''
                    document.getElementById('pay').disabled = false

                } else {
                    document.getElementById('idsvdSearch').value = ''
                    document.getElementById('messAddSvd').innerHTML = 'id not exist or svd ordered'
                }

            })
            .catch(e => console.log(e))
    }

})

btnAddPr.addEventListener('click', () => {
    let idPro = document.getElementById('idProSearch').value
    if (idPro) {
        fetch(`/api/product/getPro/${idPro}?token=${token}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                token: localStorage.getItem('token-user'),
            }
        })
            .then(req => req.json())
            .then(json => {
                if (json.code === 0) {
                    if (countPr != 0) {
                        for (let i = 1; i <= countPr; i++) {
                            if (document.getElementById('ProOrder' + i).innerHTML === json.data[0].idPro)
                                return
                        }
                    }
                    countPr += 1
                    let tbPr = document.getElementById('tbPr')
                    let data = json.data[0]

                    let tr = document.createElement('tr')
                    let td1 = document.createElement('td')
                    let td2 = document.createElement('td')
                    let td3 = document.createElement('td')
                    let td4 = document.createElement('td')
                    let td5 = document.createElement('td')
                    let input = document.createElement('input')
                    let btn = document.createElement('button')

                    btn.setAttribute('onclick', "return removeTr('trPro" + countPr + "')")
                    btn.innerHTML = 'x'

                    input.setAttribute('id', 'qtyBuy' + countPr)
                    input.setAttribute('type', 'number')
                    input.setAttribute('value', 1)

                    td1.innerHTML = data.idPro
                    td2.innerHTML = data.name
                    td3.appendChild(input)
                    td4.innerHTML = data.price
                    td2.setAttribute('id', "namePro" + countPr)
                    td4.setAttribute('id', "pricePro" + countPr)
                    td5.appendChild(btn)

                    tr.setAttribute('id', 'trPro' + countPr)
                    td1.setAttribute('id', 'ProOrder' + countPr)

                    tr.appendChild(td1)
                    tr.appendChild(td2)
                    tr.appendChild(td3)
                    tr.appendChild(td4)
                    tr.appendChild(td5)

                    tbPr.appendChild(tr)

                    document.getElementById('idProSearch').value = ''
                    document.getElementById('pay').disabled = false
                }
                else {
                    document.getElementById('idProSearch').value = ''
                    document.getElementById('messAddPro').innerHTML = 'id product not exist'
                }

            })
            .catch(e => console.log(e))
    }

})

pay.addEventListener('click', () => {
    document.getElementById("err").innerHTML = ''
    let sum = 0
    let arrSvd = []
    let arrPro = []
    let obj
    if (count != 0) {
        for (let i = 1; i <= count; i++) {
            if (document.getElementById('idPriceSvd' + i)) {
                sum += parseInt(document.getElementById('idPriceSvd' + i).innerHTML)
                obj = {
                    'idSvd': document.getElementById('sdvOrder' + i).innerHTML,
                    'name': document.getElementById('nameSvd' + i).innerHTML,
                    'price': document.getElementById('idPriceSvd' + i).innerHTML
                }

                arrSvd.push(obj)
            }
        }

    }

    if (countPr != 0) {
        for (let j = 1; j <= countPr; j++) {
            if (document.getElementById('qtyBuy' + j) && document.getElementById('qtyBuy' + j).value) {
                sum += (parseInt(document.getElementById('qtyBuy' + j).value) * parseInt(document.getElementById('pricePro' + j).innerHTML))

                obj = {
                    'idPro': document.getElementById('ProOrder' + j).innerHTML,
                    'name': document.getElementById('namePro' + j).innerHTML,
                    'qty': document.getElementById('qtyBuy' + j).value,
                    'price': document.getElementById('pricePro' + j).innerHTML
                }

                arrPro.push(obj)
            }
        }
    }
    let a = sum
    document.getElementById('sum').innerHTML = "Total: " + a.toLocaleString('vi', { style: 'currency', currency: 'VND' })

    if (sum == 0) {
        document.getElementById('err').innerHTML = 'please choose svd or product'
        return
    }

    if (!document.getElementById('dateOrder').value) {
        document.getElementById('err').innerHTML = 'please choose day'
        return
    }

    idBill = document.getElementById('idBill').innerHTML
    idCus = document.getElementById('idCus').value
    listSvd = arrSvd
    listProducts = arrPro
    dateUse = document.getElementById('dateOrder').value
    dateOrder = document.getElementById('date').innerHTML
    fetch('/api/staff/pay', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            token: localStorage.getItem('token-user'),
        },
        body: JSON.stringify({
            idBill: idBill,
            idCus: idCus,
            listSvd: listSvd,
            listProducts: listProducts,
            sum: sum,
            dateUse: dateUse,
            dateOrder: dateOrder,
            token: token
        })
    })
        .then(req => req.json())
        .then(json => {
            if (json.code === 0) {
                return window.location.href = "/transaction/pay?mess=Pay " + idBill + " success"
                document.getElementById('err').innerHTML = json.message
            }
            else
                document.getElementById('err').innerHTML = json.message;
        })
        .catch(e => console.log(e))
})
