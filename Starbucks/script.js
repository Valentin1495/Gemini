const btn = document.getElementById('menu-btn')
const menu = document.getElementById('menu')

function navToggle() {
    btn.classList.toggle('open')
    menu.classList.toggle('hidden')
    document.body.classList.toggle('no-scroll')
}

btn.addEventListener('click', navToggle)