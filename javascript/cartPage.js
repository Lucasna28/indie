document.addEventListener("DOMContentLoaded", function () {
    const cartContainer = document.querySelector(".product-info-container");
    const cartSummary = document.querySelector(".cart-summary");

    // Hent gemte varer fra localStorage
    let cartItems = [];
    try {
        cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    } catch (error) {
        console.error("Error parsing cartItems from localStorage:", error);
    }

    // Generer HTML for hver vare og sæt det ind i produktinfo-containeren
    cartItems.forEach(item => {
        const itemHTML = createCartItemHTML(item);
        cartContainer.innerHTML += itemHTML;
    });

    function updateCartItemQuantity(title, size, quantityChange) {
        // Hent indkøbskurvdata fra localStorage
        let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

        // Find det relevante vareobjekt i indkøbskurven
        const targetItem = cartItems.find(item => item.title === title && item.size === size);

        if (targetItem) {
            // Opdater mængden i vareobjektet baseret på ændringen
            targetItem.quantity += quantityChange;

            // Check om den nye mængde er større end eller lig med 0, før opdatering
            if (targetItem.quantity >= 0) {
                // Opdater localStorage med den opdaterede indkøbskurv
                localStorage.setItem("cartItems", JSON.stringify(cartItems));

                // Opdater product-info-container med den opdaterede indkøbskurv
                updateProductInfoContainer();

                // Opdater indkøbskurvens opsummering
                calculateCartSummary();
            } else {
                // Hvis den nye mængde er mindre end 0, fjern varen fra kurven
                removeCartItem(title, size);
            }
        }
    }

    function removeCartItem(title, size) {
        // Hent indkøbskurvdata fra localStorage
        let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

        // Find indeks for det relevante vareobjekt i indkøbskurven
        const itemIndex = cartItems.findIndex(item => item.title === title && item.size === size);

        if (itemIndex !== -1) {
            // Fjern vareobjektet fra indkøbskurven baseret på det fundne indeks
            cartItems.splice(itemIndex, 1);

            // Opdater localStorage med den opdaterede indkøbskurv
            localStorage.setItem("cartItems", JSON.stringify(cartItems));

            // Opdater product-info-container med den opdaterede indkøbskurv
            updateProductInfoContainer();

            // Opdater indkøbskurvens opsummering
            calculateCartSummary();
        }
    }

    function updateProductInfoContainer() {
        const cartContainer = document.querySelector(".product-info-container");

        // Hent indkøbskurvdata fra localStorage
        let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

        // Generer HTML for indkøbskurvposterne
        const cartHTML = cartItems.map(createCartItemHTML).join("");

        // Indsæt det genererede HTML i product-info-container i cart.html
        cartContainer.innerHTML = cartHTML;

        // Opdater knapper til fjernelse og opdatering af mængde
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

        // Hent indkøbskurvdata fra localStorage
        let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

        // Beregn total antal og total pris
        const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
        const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

        // Opdater HTML-elementerne med de beregnede værdier
        totalQuantityElement.innerText = `Quantity ${totalQuantity}x`;

       
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

    // Opdater knapper til fjernelse og opdatering af mængde ved initialisering
    updateButtons();
});
