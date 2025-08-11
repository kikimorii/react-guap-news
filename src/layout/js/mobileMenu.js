const menuMobileBtn = document.getElementById('menuBtnMobile');
const menuMobileIcon = document.getElementById('menuMobileIcon');
const mobileMenu = document.getElementById('mobileMenu');
const backBtn = document.getElementById('backBtn');
const listItems = document.querySelectorAll(".mobile-menu_list > li, .mobile-menu_list_inner > li");
const headerText = document.querySelector('.header_mobile-text');
const menuMobileSublists = document.querySelectorAll('.mobile-menu_sublist');
const header = document.querySelector('.header');
const mainContent = document.querySelector('main');
const footerContent = document.querySelector('footer');

// MobileMenu
if (menuMobileBtn) {
    menuMobileBtn.addEventListener('click', () => {
        menuMobileIcon.classList.toggle("active");
        mobileMenu.classList.toggle('active')
        mainContent.classList.toggle('d-none')
        footerContent.classList.toggle('d-none');
        siteMapLink.classList.toggle('d-none');
        siteSearchLink.classList.toggle('d-none');
        header.classList.toggle('fixed');


        if (!mobileMenu.classList.contains("active")) {
            backBtn.classList.add("d-none");
            headerLogo.classList.remove("d-none");
            headerText.textContent = '';

            const activeLists = document.querySelectorAll(".mobile-menu_list_inner.active");
            activeLists.forEach(list => list.classList.remove("active"));
        }
    });
}

listItems.forEach(item => {
    const nestedList = item.querySelector("ul");

    if (nestedList) {
        item.addEventListener("click", function (event) {
            event.stopPropagation();

            nestedList.classList.add("active");
            if (!item.classList.contains('mobile-menu_list_inner-next')) {
                for (const element of item.textContent.split('\n')) {
                    if (element) {
                        headerText.textContent = element;
                        break;
                    }
                }
            }
            backBtn.classList.remove("d-none");
            headerLogo.classList.add("d-none");
            menuMobileSublists.forEach(list => list.classList.add("d-none"));
        });
    }
});

if (backBtn) {
    backBtn.addEventListener("click", function () {
        const activeLists = document.querySelectorAll(".mobile-menu_list_inner.active");

        if (activeLists.length > 0) {
            const lastActiveList = activeLists[activeLists.length - 1];
            lastActiveList.classList.remove("active");
        }

        if (document.querySelectorAll(".mobile-menu_list_inner.active").length === 0) {
            headerText.textContent = '';
            backBtn.classList.add("d-none");
            headerLogo.classList.remove("d-none");
            menuMobileSublists.forEach(list => list.classList.remove("d-none"));
        }
    });
}