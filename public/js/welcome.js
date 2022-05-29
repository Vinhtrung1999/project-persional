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
