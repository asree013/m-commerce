function validateLogin() {
    const jwt = localStorage.getItem('jwt')
    if(!jwt){
        history.back()
    }
}

validateLogin()