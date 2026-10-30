const mobMenu = document.getElementById('mob-menu');
const burger = document.querySelector('[data-menu-open]');

function openMenu() {
    mobMenu.classList.add('is-open');
    mobMenu.setAttribute('aria-hidden', 'false');
    burger.setAttribute('aria-expanded', 'true');
    document.documentElement.classList.add('is-menu-open');
}

function closeMenu() {
    mobMenu.classList.remove('is-open');
    mobMenu.setAttribute('aria-hidden', 'true');
    burger.setAttribute('aria-expanded', 'false');
    document.documentElement.classList.remove('is-menu-open');
}

burger.addEventListener('click', openMenu);
mobMenu.querySelector('[data-menu-close]').addEventListener('click', closeMenu);

// Клик по пункту: закрываем меню, браузер переходит к якорю
mobMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobMenu.classList.contains('is-open')) closeMenu();
});

// Если окно растянули до десктопа с открытым меню
window.matchMedia('(min-width: 1025px)').addEventListener('change', (e) => {
    if (e.matches) closeMenu();
});