const currentPath = window.location.pathname;

document.querySelectorAll('.navbar a').forEach(link => {
    const linkPath = link.getAttribute('href');

    if (currentPath.includes(linkPath) && linkPath !== '/') {
        link.classList.add('active');
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const burgerIcon = document.querySelector('.burger-icon');
    const mobileNav = document.querySelector('.mobile-nav');

    burgerIcon.addEventListener('click', function () {
        mobileNav.classList.toggle('show');
    });

    // Skjul mobile-nav når der klikkes uden for det
    document.addEventListener('click', function (event) {
        if (!burgerIcon.contains(event.target) && !mobileNav.contains(event.target)) {
            mobileNav.classList.remove('show');
        }
    });
});
