import {logins} from '../service/authen.service'

async function onLogin() {
    // const username = document.getElementById('username')
    //     const password = document.getElementById('password')
    //     const data = {
    //         username: username.value,
    //         password: password.value
    //     }
    // const res = await logins(data)
    // if(res){
    //     localStorage.setItem('jwt', result.data)
    //     window.location.href = '/home'
    // }
    try {
        const username = document.getElementById('username')
        const password = document.getElementById('password')
        const data = {
            username: username.value,
            password: password.value
        }
        const result = await axios.post('http://localhost:3000/api/login', data)
        if(result.data) {
            localStorage.setItem('jwt', result.data)
            window.location.href = '/home'
        }
    } catch (error) {
        alert(JSON.stringify(error))
    }
}