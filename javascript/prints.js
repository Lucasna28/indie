document.addEventListener("DOMContentLoaded", function () {
    const printGrid = document.querySelector(".print-grid");

    fetch("/prints.json")
        .then(response => response.json())
        .then(data => {
            printGrid.innerHTML = data.map(createPrintHTML).join("");
            attachEventListeners();
            initSlideshow();
        })
        .catch(error => console.error("Error loading prints:", error));

    function createPrintHTML(print) {
        function getPrice(size) {
            const price = print.prices[size];
            return price ? `${price} kr` : "Ukendt pris";
        }

        // Opret absolut sti til billederne
        const absoluteImagePath = window.location.origin + print.image;

        return `
            <li data-prices='${JSON.stringify(print.prices)}'>
                <p class="print-titel">${print.titel}</p>
                <div class="slideshow-container">
                    <button class="previous-btn">&lt;</button>
                    <img class="slide" src="${absoluteImagePath}" alt="Print">
                    <img class="slide" src="${absoluteImagePath}" alt="print">
                    <button class="next-btn">&gt;</button>
                </div>
                <p class="print-price">${getPrice(print.sizes[0])}</p>
                <p for="print-size">Select Print Size:</p>
                <select name="print-size" class="print-size" data-prices='${JSON.stringify(print.prices)}'>
                    ${createOptionsHTML(print.sizes)}
                </select>
                <button class="buy-btn">køb</button>
            </li>
        `;
    }

    function initSlideshow() {
        const slideshows = document.querySelectorAll(".slideshow-container");

        slideshows.forEach(initSlideshowContainer);
    }

    function initSlideshowContainer(slideshow) {
        const slides = Array.from(slideshow.querySelectorAll(".slide"));
        let currentIndex = 0;

        function showSlide(index) {
            currentIndex = (index + slides.length) % slides.length;
            slides.forEach((slide, i) => {
                slide.style.display = i === currentIndex ? "block" : "none";
            });
        }

        function handleButtonClick(direction) {
            showSlide(currentIndex + direction);
        }

        const nextButton = slideshow.querySelector(".next-btn");
        const prevButton = slideshow.querySelector(".previous-btn");

        nextButton.addEventListener("click", () => handleButtonClick(1));
        prevButton.addEventListener("click", () => handleButtonClick(-1));

        showSlide(currentIndex);
    }

    function createOptionsHTML(options) {
        return options.map(option => `<option value="${option}">${option}</option>`).join("");
    }

    function getPrice(pricesData, size) {
        const prices = pricesData ? JSON.parse(pricesData) : null;
        return prices && prices[size] ? `${prices[size]} kr` : "Ukendt pris";
    }

    function attachEventListeners() {
        printGrid.addEventListener("click", function (event) {
            if (event.target.classList.contains("buy-btn")) {
                handleBuyButtonClick(event);
            }
        });

        // Add event listener for the checkout button
        const checkoutButton = document.querySelector(".checkout-btn");
        if (checkoutButton) {
            checkoutButton.addEventListener("click", function () {
                // Redirect to cart.html
                window.location.href = "/undersider/cart.html";
            });
        }
    }

    function handleBuyButtonClick(event) {
        const printTitle = event.target.parentElement.querySelector(".print-titel").textContent;
        const printSizeSelect = event.target.parentElement.querySelector(".print-size");
        const selectedSize = printSizeSelect.value;
        const printImage = event.target.parentElement.querySelector(".slide").src;
    
        const cartItem = {
            title: printTitle,
            size: selectedSize,
            price: getPrice(event.target.parentElement.dataset.prices, selectedSize),
            image: printImage,
        };
    
        addToCart(cartItem);
    }
    
    function addToCart(item) {
        let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

        const existingItem = cartItems.find(cartItem => cartItem.title === item.title && cartItem.size === item.size);

        if (existingItem) {
            existingItem.quantity = (existingItem.quantity || 1) + 1;
        } else {
            item.quantity = 1;
            cartItems.push(item);
        }

        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        updateCartUI();
    }

    function updateCartUI() {
        const cartAmountElement = document.querySelector(".cart-amount");
        const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        const totalUniqueItems = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);

        cartAmountElement.textContent = totalUniqueItems.toString();
        localStorage.setItem("cartAmount", totalUniqueItems.toString());
    }
});
