// =====trigger enter=======================
let pwd = document.getElementById('password')
pwd.addEventListener("keypress", e => {
    if (event.key === "Enter") {
        event.preventDefault()
        document.getElementById("btn").click()
    }
})
// ============================================
var btn = document.getElementById('btn')


btn.addEventListener('click', () => {
    var CMND = document.getElementById('CMND').value
    var password = document.getElementById('password').value

    if (CMND === '' || password === '')
        document.getElementById('mess').innerHTML = 'CMND or pass not empty'
    else {
        console.log(CMND, password)
        fetch('/api/customer/loginCus', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ CMND: CMND, password: password })
        })
            .then(req => req.json())
            .then(json => {
                if (json.code == 0) {
                    localStorage.setItem('token-user', json.token)
                    return window.location = `/?type=customer&token=${json.token}`
                }
                else
                    document.getElementById('mess').innerHTML = 'CMND or password wrong!'
            })
            .catch(e => console.log(e))
    }

})

