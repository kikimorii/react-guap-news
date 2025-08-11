const menuDesktopBtn = document.getElementById('menuBtnDesktop');
const menuDesktopIcon = document.getElementById('menuDesktopIcon');
const desktopMenuTabs = document.getElementById('desktopMenuTabs');
const desktopMenu = document.getElementById('desktopMenu');

const headerLogo = document.getElementById('headerLogo');
const siteMapLink = document.getElementById('siteMapLink');
const siteSearchLink = document.getElementById('siteSearchLink');
const header = document.querySelector('.header');
const mainContent = document.querySelector('main');
const footerContent = document.querySelector('footer');

// Появление desktopHeaderMenu
if (menuDesktopBtn != null) {
    menuDesktopBtn.addEventListener('click', function (event) {
        menuDesktopIcon.classList.toggle('active');
        desktopMenuTabs.classList.toggle('active');
        desktopMenu.classList.toggle('active')
        // desktopMenu.classList.toggle('d-none');
        headerLogo.classList.toggle('d-none');
        header.classList.toggle('fixed');
        mainContent.classList.toggle('header-fixed');
        siteMapLink.classList.toggle('d-none');
        siteSearchLink.classList.toggle('d-none');

        setTimeout(() => {
            mainContent.classList.toggle('d-none')
            footerContent.classList.toggle('d-none');
        }, !menuDesktopIcon.classList.contains('active') ? 0 : 300);
    });
}

// Табы desktopHeaderMenu
document.querySelectorAll('.btn-header').forEach(link => {
    link.addEventListener('click', function (e) {

        document.querySelectorAll('.btn-header').forEach(link => {
            link.classList.remove('active');
        });

        document.querySelectorAll('.header-menu_list.wrapper').forEach(menu => {
            menu.classList.remove('active');
        });

        this.classList.add('active');

        const linkId = this.id.split('-')[1];
        document.getElementById(`desktopMenuNode-${linkId}`).classList.add('active');
    });
});