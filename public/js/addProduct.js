let token = localStorage.getItem('token-user')
var btn = document.getElementById('btn')

btn.addEventListener('click', () =>{
    document.getElementById('err').innerHTML = ''
    document.getElementById('mess').innerHTML = ''
    
    var idPro = document.getElementById('idPro').value
    var qty = document.getElementById('qty').value

    if(idPro && qty){
        fetch('/api/product/addProduct', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                idPro : idPro,
                qty: qty,
                token: token                            
            })
        })
        .then(req => req.json())
        .then(json => {
            if(json.code === 0){
                document.getElementById('idPro').value = ''
                document.getElementById('qty').value = ''
                document.getElementById('mess').innerHTML = 'add '+idPro+' succeed - quantity ' + qty

            }
            else if(json.code === 10)
                document.getElementById('err').innerHTML = json.message
            else
                document.getElementById('err').innerHTML = "please check information again"
        })
        .catch(e => console.log(e))
    }
    else
        document.getElementById('err').innerHTML = "please check information again1"
})