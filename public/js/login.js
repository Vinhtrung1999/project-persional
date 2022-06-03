// enter btn
let pwd = document.getElementById('password')
pwd.addEventListener("keypress", e => {
    if (event.key === "Enter") {
        event.preventDefault()
        document.getElementById("btn").click();
    }
})
// =======================================================


let btn = document.getElementById('btn')

btn.addEventListener('click', () => {
    let username = document.getElementById('username').value
    let password = document.getElementById('password').value
    let alert = document.getElementById('alert')

    alert.style.display = 'none'

    if (username === '' || password === '') {
        document.getElementById('mess').innerHTML = 'username or pass not empty'
        alert.style.display = 'flex'
    }

    else {
        fetch('/api/staff/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: username, password: password })
        })
            .then(req => req.json())
            .then(json => {
                if (json.code == 0){
                    localStorage.setItem('token-user', json.token)
                    return window.location = "/"
                }
                else {
                    document.getElementById('mess').innerHTML = 'username or password wrong!'
                    alert.style.display = 'flex'
                }

            })
            .catch(e => console.log(e))
    }

})