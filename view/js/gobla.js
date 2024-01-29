const head = document.querySelector('head')
head.innerHTML += `
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma-rtl.min.css">
    <link rel="icon" type="image/x-icon" href="../image/logo.png">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/1.6.5/axios.min.js" integrity="sha512-TjBzDQIDnc6pWyeM1bhMnDxtWH0QpOXMcVooglXrali/Tj7W569/wd4E8EDjk1CwOAOPSJon1VfcEt1BI4xIrA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
`

const navbar = document.querySelector('.navbar')
navbar.innerHTML = `
    <div class="navbar-brand">
    <a class="navbar-item" href="/">
    <img src="../image/length.png"width="112" height="28">
    </a>
    <div class="navbar-burger" >
    <span></span>
    <span></span>
    <span></span>
    </div>
    <div id="select_store" class="select m-2">
        
    </div>
    </div>

    <div id="navbarExampleTransparentExample" class="navbar-menu">
    <div class="navbar-start">
    <a class="navbar-item" href="/">
        Home
    </a>
    <div class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link">
            Menu
        </a>
        <div class="navbar-dropdown is-boxed">
        <a class="navbar-item" href="/category/00000000-0000-0000-0000-000000000000">
            Category Create
        </a>
        <a class="navbar-item" href="https://bulma.io/documentation/overview/modifiers/">
            Modifiers
        </a>
        <a class="navbar-item" href="https://bulma.io/documentation/columns/basics/">
            Columns
        </a>
        <a class="navbar-item" href="https://bulma.io/documentation/layout/container/">
            Layout
        </a>
        <a class="navbar-item" href="https://bulma.io/documentation/form/general/">
            Form
        </a>
        <hr class="navbar-divider">
        <a class="navbar-item" href="https://bulma.io/documentation/elements/box/">
            Elements
        </a>
        <a class="navbar-item is-active" href="https://bulma.io/documentation/components/breadcrumb/">
            Components
        </a>
        </div>
    </div>
    </div>
    

        <div class="navbar-end" id="profile" style="margin-right: 20px" >
            <div class="navbar-item has-dropdown is-hoverable">
                <div class="navbar-link">
                    <div class="navbar-item">
                        <figure class="image ">
                            <img class="is-rounded" id="image_profile" src="">
                        </figure>
                    </div>
                    <div class="navbar-item">
                        <p id="name_profile"></p>
                    </div>

                </div>
                <div class="navbar-dropdown is-boxed">
                    <a class="navbar-item" >
                        Profile
                    </a>
                    <a class="navbar-item" href="/product">
                        MyProduct
                    </a>
                    <a class="navbar-item" href="/store">
                        MyStore
                    </a>
                    <a class="navbar-item" onclick="onLogout()" >
                        Logout
                    </a>
                </div>
            </div>

            
        </div>
        <div class="navbar-end" style="" id="singin">
            <div class="navbar-item">
                <div class="field is-grouped">
                    <p class="control">
                        <a class="bd-tw-button button" href="/register">
                        <span>
                            Register
                        </span>
                        </a>
                    </p>
                    <p class="control">
                        <a class="button is-primary" href="/login">
                        <span>Login</span>
                        </a>
                    </p>
                </div>
            </div>
        </div>
    </div>
`
function validateLogin() {
    const jwt = localStorage.getItem('jwt')
    let singin = document.getElementById('singin')
    let profile = document.getElementById('profile')
    if(!jwt) {
        profile.style.display = "none"
    }
    else{
        singin.style.display = "none"
        feedUsername(jwt)
    }
}

async function feedMyStore(userId) {
    try {
        const result = await axios.get(`http://localhost:3000/api/user/${userId}/store`)
        if(result.data) {
            if(result.data.length === 0) {
                document.getElementById('select_store').innerHTML = `
                    <select>
                        <option selected disabled>เลือกร้านค้า</option>
                        <option href="/store_form">สร้างร้านค้า</option>
                    </select>
                `
            }
            else{
                let store = localStorage.getItem("store")
                let html = ''
                if(store){
                    for (let i = 0; i < result.data.length; i++) {
                        const element = result.data[i];
                        html += `
                            <select id="selected" onchange="onSelectStore()">
                                <option selected disabled>${JSON.parse(store).store_name}</option>
                                <option value="${element.id}, ${element.name}">${element.name}</option>
                            </select>
                        `
                    }
                    document.getElementById('select_store').innerHTML = html
                }
                else{
                    for (let i = 0; i < result.data.length; i++) {
                        const element = result.data[i];
                        html += `
                            <select id="selected" onchange="onSelectStore()">
                                <option selected disabled>เลือกร้านค้า</option>
                                <option value="${element.id}, ${element.name}">${element.name}</option>
                            </select>
                        `
                    }
                    document.getElementById('select_store').innerHTML = html
                }
            }
        }
    } catch (error) {
        console.log('errStore: ', error);
    }
}

async function feedUsername(jwt) {
    const bearer = JSON.parse(jwt).accessToken
    try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${bearer}`);

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
        };

        fetch("http://localhost:3000/api/token", requestOptions)
        .then(response => response.json())
        .then(result => {
            if(result.message === "jwt expired") {
                alert('session หมดอายุ')
                localStorage.removeItem('jwt')
                localStorage.removeItem('store')

                window.location.href = '/login'
            }
            document.getElementById('image_profile').src = result.image === "" || result.image === null? '../image/images.png': 'http://localhost:3000/images/'+ result.image
            document.getElementById('name_profile').innerHTML = `${result.firstname} ${result.lastname}`
            feedMyStore(result.user_id)
        })
        .catch(error => console.log('error', error));
    } catch (error) {
        console.log(error);
    }
}

function onSelectStore() {
    const value = document.getElementById('selected').value
    const store = {
        store_id: value.split(",")[0],
        store_name: value.split(",")[1]
    }
    localStorage.setItem('store', JSON.stringify(store))
}
validateLogin()

function onLogout() {
    localStorage.removeItem('jwt')
    localStorage.removeItem('store')
    window.location.href = '/login'
}
