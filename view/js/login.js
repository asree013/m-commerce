
async function onLogin() {
    const alert = document.getElementById('alert')
    const pUsername = document.getElementById('pUsername')
    const pPassword = document.getElementById('pPassword')
    try {
        alert.inert = ''
        pUsername.innerHTML = ''
        pPassword.innerHTML = ''
        const username = document.getElementById('username')
        const password = document.getElementById('password')
        const data = {
            username: username.value,
            password: password.value
        }
        const result = await axios.post('http://localhost:3000/api/login', data)
        console.log(result);
        if(result.data) {
            localStorage.setItem('jwt', JSON.stringify(result.data))
            window.location.href = '/'
        }
    } catch (error) {
        if(error.response.status === 401){
            pUsername.innerHTML = error.response.data
        }
        else if(error.response.status === 402){
            pPassword.innerHTML = error.response.data.message
        }
        else{
            alert.innerHTML = `
                <div class="notification is-danger is-light">
                    <button class="delete"></button>
                    มีปัญหาที่ Servers
                </div>
            `
        }
    }
}