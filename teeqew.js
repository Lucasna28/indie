document.addEventListener("DOMContentLoaded", function () {
    const cartContainer = document.querySelector(".product-info-container");
    const cartSummary = document.querySelector(".cart-summary");
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const cartHTML = cartItems.map(createCartItemHTML).join("");
    cartContainer.innerHTML = cartHTML;
    calculateCartSummary();

    function createCartItemHTML(item) {
        return `
            <div class="product-info">
                <div class="image-info">
                    <img class="product-img" src="${item.image}" alt="${item.title}">
                    <div>
                        <p class="product-name">${item.title}</p>
                        <button class="remove-btn" onclick="removeCartItem('${item.title}', '${item.size}')">Remove</button>
                    </div>
                </div>
                <div class="quantity-btn-container">
                    <button class="quantity-btn minus-quantity" onclick="updateCartItemQuantity('${item.title}', '${item.size}', -1, ${item.quantity})">-</button>
                    <p class="quantity" id="quantity-${item.title}-${item.size}">${item.quantity}</p>
                    <button class="quantity-btn plus-quantity" onclick="updateCartItemQuantity('${item.title}', '${item.size}', 1, ${item.quantity})">+</button>
                </div>
                <p class="price">${item.price}</p>
                <p class="total-price">${(item.price * item.quantity).toFixed(2)} kr</p>
            </div>
        `;
    }
    const totalPrice = cartItems.reduce((total, item) => {
        const itemPrice = parseFloat(item.price);
        const itemQuantity = parseInt(item.quantity);
    
        // Tjek, om itemPrice eller itemQuantity er NaN, og undgå beregning, hvis det er tilfældet
        if (!isNaN(itemPrice) && !isNaN(itemQuantity)) {
            return total + itemPrice * itemQuantity;
        } else {
            return total;
        }
    }, 0);
        



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

    function updateLocalStorage(title, size, quantity) {
        // Hent indkøbskurvdata fra localStorage
        let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

        // Find det relevante vareobjekt i indkøbskurven
        const targetItem = cartItems.find(item => item.title === title && item.size === size);

        if (targetItem) {
            // Opdater mængden i vareobjektet
            targetItem.quantity = quantity;

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
        totalPriceElement.innerText = `${totalPrice.toFixed(2)} kr.`;
    }
});
