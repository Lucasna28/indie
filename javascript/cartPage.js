document.addEventListener("DOMContentLoaded", function () {
    const cartContainer = document.querySelector(".product-info-container");
    const cartSummary = document.querySelector(".cart-summary");
    const shippingSelect = document.getElementById("shipping");
    const checkoutBtn = document.querySelector(".checkout-btn");
    const modalContainer = document.getElementById("modalContainer");
    const orderDetailsContainer = document.getElementById("orderDetails");
    const totalCostContainer = document.getElementById("totalCost");

    checkoutBtn.addEventListener("click", function () {
        // Check if credit card information is filled out
        const cardNumber = document.getElementById("cardNumber").value.trim();
        const expiryDate = document.getElementById("expiryDate").value.trim();
        const cvv = document.getElementById("cvv").value.trim();

        if (cardNumber === "" || expiryDate === "" || cvv === "") {
            alert("Please fill out credit card information before proceeding.");
        } else {
            // virker ikke
            showModal();
        }
    });


    window.closeModal = function () {
        modalContainer.style.display = "none";
    };


    let cartItems = [];
    try {
        cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    } catch (error) {
        console.error("Error parsing cartItems from localStorage:", error);
    }

    cartItems.forEach(item => {
        const itemHTML = createCartItemHTML(item);
        cartContainer.innerHTML += itemHTML;
    });

    // Tilføj event listener til shipping elementet
    shippingSelect.addEventListener("change", function () {
        calculateCartSummary();
    });

    function updateCartItemQuantity(title, size, quantityChange) {
        let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

        const targetItem = cartItems.find(item => item.title === title && item.size === size);

        if (targetItem) {
            targetItem.quantity += quantityChange;

            if (targetItem.quantity >= 0) {
                localStorage.setItem("cartItems", JSON.stringify(cartItems));

                updateProductInfoContainer();

                calculateCartSummary();
            } else {
                removeCartItem(title, size);
            }
        }
    }

    function removeCartItem(title, size) {
        // Hent indkøbskurvdata fra localStorage
        let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

        const itemIndex = cartItems.findIndex(item => item.title === title && item.size === size);

        if (itemIndex !== -1) {
            cartItems.splice(itemIndex, 1);

            localStorage.setItem("cartItems", JSON.stringify(cartItems));

            updateProductInfoContainer();

            calculateCartSummary();
        }
    }

    function updateProductInfoContainer() {
        const cartContainer = document.querySelector(".product-info-container");

        let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

        const cartHTML = cartItems.map(createCartItemHTML).join("");

        cartContainer.innerHTML = cartHTML;

        updateButtons();
    }

    function updateButtons() {
        const minusButtons = document.querySelectorAll(".quantity-btn.minus-quantity");
        const plusButtons = document.querySelectorAll(".quantity-btn.plus-quantity");
        const removeButtons = document.querySelectorAll(".remove-btn");

        minusButtons.forEach(button => {
            button.addEventListener("click", function () {
                const title = this.dataset.title;
                const size = this.dataset.size;
                updateCartItemQuantity(title, size, -1);
            });
        });

        plusButtons.forEach(button => {
            button.addEventListener("click", function () {
                const title = this.dataset.title;
                const size = this.dataset.size;
                updateCartItemQuantity(title, size, 1);
            });
        });

        removeButtons.forEach(button => {
            button.addEventListener("click", function () {
                const title = this.dataset.title;
                const size = this.dataset.size;
                removeCartItem(title, size);
            });
        });
    }

    function calculateCartSummary() {
        const totalQuantityElement = document.querySelector(".total-quantity");
        const totalPriceElement = document.querySelector(".total-price");

        let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

        const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
        const totalPrice = cartItems.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0);

        const selectedShippingOption = shippingSelect.value;
        let shippingCost = 0;

        switch (selectedShippingOption) {
            case "standard":
                shippingCost = 50;
                break;
            case "express":
                shippingCost = 100;
                break;
            case "nextDay":
                shippingCost = 150;
                break;
        }

        totalQuantityElement.innerText = `Quantity ${totalQuantity}x`;
        totalPriceElement.innerText = `${(totalPrice + shippingCost).toFixed(2)} kr.`;
    }

    function createCartItemHTML(item) {
        const priceAsNumber = parseFloat(item.price);
        return `
            <div class="product-info" data-title="${item.title}" data-size="${item.size}">
                <div class="image-info">
                    <img class="product-img" src="${item.image}" alt="${item.title}">
                    <div>
                        <p class="product-name">${item.title}</p>
                        <button class="remove-btn" data-title="${item.title}" data-size="${item.size}">Remove</button>
                    </div>
                </div>
                <div class="quantity-btn-container">
                    <button class="quantity-btn minus-quantity" data-title="${item.title}" data-size="${item.size}">-</button>
                    <p class="quantity" id="quantity-${item.title}-${item.size}">${item.quantity}</p>
                    <button class="quantity-btn plus-quantity" data-title="${item.title}" data-size="${item.size}">+</button>
                </div>
                <p class="price">${item.price}</p>
                <p class="price">${(priceAsNumber * item.quantity).toFixed(2)}</p>
            </div>
        `;
    }

    updateButtons();
    calculateCartSummary();
    
});

