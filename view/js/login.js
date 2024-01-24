function onLogin() {
    const username = document.getElementById('username')
    const password = document.getElementById('password')
    alert(JSON.stringify({
        username: username.value,
        password: password.value
    }))
}