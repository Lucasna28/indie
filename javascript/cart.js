// cart.js

document.addEventListener("DOMContentLoaded", function () {
    const cart = document.querySelector('.cart');
    const cartContainer = document.querySelector('.cart-container');
    const removeAllButton = document.querySelector('.RemoveAll');

    // Show cart-container when hovering over the cart icon or the cart container
    cart.addEventListener("mouseover", function () {
        cartContainer.style.display = "block";
        updateCartList();
    });

    // Hide cart-container only when the mouse leaves both the cart icon and the cart container
    document.addEventListener("mouseout", function (event) {
        if (!cart.contains(event.target) && !cartContainer.contains(event.target)) {
            cartContainer.style.display = "none";
        }
    });

    // Add event listener to RemoveAll button
    removeAllButton.addEventListener("click", function () {
        clearCart();
        updateCartUI();
        updateCartList();
    });

    function clearCart() {
        localStorage.removeItem("cartItems");
        localStorage.removeItem("cartAmount");
    }

    function updateCartList() {
        const cartList = document.querySelector(".cart-list");
        const totalElement = document.querySelector(".cart-total");

        let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

        cartList.innerHTML = cartItems.map(createCartItemHTML).join("");

        const totalPrice = cartItems.reduce((total, item) => total + parseFloat(item.price), 0).toFixed(2);
        totalElement.textContent = `${totalPrice} kr`;
    }

    function updateCartUI() {
        const cartAmountElement = document.querySelector(".cart-amount");
        const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

        cartAmountElement.textContent = cartItems.length.toString();
    }


    function createCartItemHTML(item) {
        return `<li class="cart-item">
                    <img src="${item.image}" alt="${item.title}" class="cart-item-image">
                    <div class="cart-item-details">
                        <p class="cart-item-title">${item.title}</p>
                        <p class="cart-item-size">${item.size}</p> 
                        <p class="cart-item-price">${item.price}</p>
                        <p class="cart-item-quantity">Quantity: ${item.quantity || 1}</p>
                    </div>
                </li>`;
    }
});

