let token = localStorage.getItem('token-user')

let block_salary = document.getElementById('block-salary')
let block_product = document.getElementById('block-product')
let block_equipment = document.getElementById('block-equipment')
let block_equipment_dmg = document.getElementById('block-equipment-dmg')
let btn_fee_salary = document.getElementById('btn-fee-salary')
let btn_fee_product = document.getElementById('btn-fee-product')
let btn_fee_equipment = document.getElementById('btn-fee-equipment')
let btn_fee_equipment_dmg = document.getElementById('btn-fee-equipment-dmg')

btn_fee_salary.addEventListener('click', () => {
    block_salary.style.display = 'block'
    block_product.style.display = 'none'
    block_equipment.style.display = 'none'
    block_equipment_dmg.style.display = 'none'
})

btn_fee_product.addEventListener('click', () => {
    block_salary.style.display = 'none'
    block_product.style.display = 'block'
    block_equipment.style.display = 'none'
    block_equipment_dmg.style.display = 'none'
})

btn_fee_equipment.addEventListener('click', () => {
    block_salary.style.display = 'none'
    block_product.style.display = 'none'
    block_equipment.style.display = 'block'
    block_equipment_dmg.style.display = 'none'
})

btn_fee_equipment_dmg.addEventListener('click', () => {
    block_salary.style.display = 'none'
    block_product.style.display = 'none'
    block_equipment.style.display = 'none'
    block_equipment_dmg.style.display = 'block'
})

//product
fetch(`/api/warehouse/getSessionInputPro?token=${token}`,{
    method: "GET",
    headers: {
        'Content-Type': 'application/json'
    }
})
.then(req => req.json())
.then(json => {
    if(json.code === 0){
        
        let data = json.data
        let sum_product = 0
        let tmp = ''
        let content_product = document.getElementById('content-product')
        data.forEach((val, index) => {
            tmp += ` <div class="content-item ${index % 2 == 0 ? 'bg-green cl-white' : ''}">
                        <div class="item item-1">${val.idcount}</div>
                        <div class="item item-2">${val.name}</div>
                        <div class="item item-3">${val.qty}</div>
                        <div class="item item-4">${val.dateIn}</div>
                        <div class="item item-5">${val.sum.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</div>
                    </div>`
            sum_product += parseInt(val.sum)
        })
        content_product.innerHTML = tmp
        document.getElementById('total-product').innerHTML = sum_product.toLocaleString('vi', {style : 'currency', currency : 'VND'})
    } 
})
.catch(err => console.log(err))

// Salary
fetch(`/api/staff/getStaffs?token=${token}`,{
    method: "GET",
    headers: {
        'Content-Type': 'application/json'
    }
})
.then(req => req.json())
.then(json => {
    if(json.code === 0){
        let data = json.data
        let content_salary = document.getElementById('content-salary')
        let sum_salary = 0
        let tmp = ''
        data.forEach((val, index) => {
            tmp += `<div class="content-item ${index % 2 == 0 ? 'bg-yl cl-white' : ''}">
                        <div class="item item-1">${val.idStaff}</div>
                        <div class="item item-2">${val.name}</div>
                        <div class="item item-3">${val.position == 0 ? 'Manager' : (val.position == 1 ? 'Saler' : 'Employee')}</div>
                        <div class="item item-4">${val.shift}</div>
                        <div class="item item-5">${val.salary.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</div>
                    </div>`
            sum_salary += parseInt(val.salary)
        })
        content_salary.innerHTML = tmp
        document.getElementById('total-salary').innerHTML = sum_salary.toLocaleString('vi', {style : 'currency', currency : 'VND'})
    } 
})
.catch(err => console.log(err))

//equipment
fetch(`/api/equipment/getTTB?token=${token}`,{
    method: "GET",
    headers: {
        'Content-Type': 'application/json'
    }
})
.then(req => req.json())
.then(json => {
    if(json.code === 0){
        let data = json.data   
        let sum_equip = 0
        let content_equipment = document.getElementById('content-equipment')
        let total_equiment = document.getElementById('total-equiment')
        let tmp =''

        data.forEach((val, index) => {
            tmp += `<div class="content-item ${index % 2 == 0 ? 'bg-grey cl-white' : ''}">
                        <div class="item item-1">${val.idTTB}</div>
                        <div class="item item-2">${val.name}</div>
                        <div class="item item-3">${val.qty}</div>
                        <div class="item item-4">${val.dateIn}</div>
                        <div class="item item-5">${(parseInt(val.qty) * parseInt(val.priceIn)).toLocaleString('vi', {style : 'currency', currency : 'VND'})}</div>
                    </div>`
            sum_equip += (parseInt(val.qty) * parseInt(val.priceIn))
        })
        content_equipment.innerHTML = tmp
        total_equiment.innerHTML = sum_equip.toLocaleString('vi', {style : 'currency', currency : 'VND'})
    } 
})
.catch(err => console.log(err))

//equipment damaged
fetch(`/api/equipment/getTTB_Broken?token=${token}`,{
    method: "GET",
    headers: {
        'Content-Type': 'application/json'
    }
})
.then(req => req.json())
.then(json => {
    if(json.code === 0){
        let data = json.data
        let total_equiment_dmg = document.getElementById('total-equiment-dmg')
        let content_equipment_dmg = document.getElementById('content-equipment-dmg')
        let sum_DMequip = 0
        let tmp = ''

        data.forEach((val, index) => {
            tmp += `<div class="content-item ${index % 2 == 0 ? 'bg-red cl-white' : ''}">
                        <div class="item item-1">${val.idTTB_Br}</div>
                        <div class="item item-2">${val.name}</div>
                        <div class="item item-3">${val.qty}</div>
                        <div class="item item-4">${val.dateIn}</div>
                        <div class="item item-5">${(parseInt(val.qty) * parseInt(val.priceIn)).toLocaleString('vi', {style : 'currency', currency : 'VND'})}</div>
                    </div>`
            sum_DMequip += (parseInt(val.qty) * parseInt(val.priceIn))
        })
        content_equipment_dmg.innerHTML = tmp
        total_equiment_dmg.innerHTML = sum_DMequip.toLocaleString('vi', {style : 'currency', currency : 'VND'})
    } 
})
.catch(err => console.log(err))