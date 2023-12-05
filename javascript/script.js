const currentPath = window.location.pathname;

document.querySelectorAll('.navbar a').forEach(link => {
    const linkPath = link.getAttribute('href');

    if (currentPath.includes(linkPath) && linkPath !== '/') {
        link.classList.add('active');
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const cart = document.querySelector('.cart');
    const cartContainer = document.querySelector('.cart-container');

    // Show cart-container when hovering over the cart icon or the cart container
    cart.addEventListener("mouseover", function () {
        cartContainer.style.display = "block";
    });

    // Hide cart-container only when the mouse leaves both the cart icon and the cart container
    document.addEventListener("mouseout", function (event) {
        if (!cart.contains(event.target) && !cartContainer.contains(event.target)) {
            cartContainer.style.display = "none";
        }
    });
});
