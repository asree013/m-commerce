const navbar = document.querySelector('nav')
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
    </div>

    <div id="navbarExampleTransparentExample" class="navbar-menu">
    <div class="navbar-start">
    <a class="navbar-item" href="https://bulma.io/">
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

    <div class="navbar-end">
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