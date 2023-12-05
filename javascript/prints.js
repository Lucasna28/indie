document.addEventListener("DOMContentLoaded", function () {
    const printGrid = document.querySelector(".print-grid");

    // Hent produkter fra prints.json
    fetch("/prints.json")
        .then(response => response.json())
        .then(data => {
            printGrid.innerHTML = data.map(createPrintHTML).join("");
            attachEventListeners();
        })
        .catch(error => console.error("Error loading prints:", error));

        function createPrintHTML(print) {
            function getPrice(size) {
                const price = print.prices[size];
                return price ? `${price} kr` : "Ukendt pris";
            }
        
            return `
                <li>
                    <p> class="print-titel" </p>
                    <img src="${print.image}" alt="Print">
                    <p class="print-price">${getPrice(print.sizes[0])}</p>
                    <p for="print-size">Select Print Size:</p>
                    <select name="print-size" class="print-size" data-prices='${JSON.stringify(print.prices)}'>
                        ${createOptionsHTML(print.sizes)}
                    </select>
                    <button class="buy-btn">køb</button>
                </li>
            `;
        }
        
    function createOptionsHTML(options) {
        return options.map(option => `<option value="${option}">${option}</option>`).join("");
    }

    function handleBuyButtonClick(event) {
        const printElement = event.target.closest("li");
        if (printElement) {
            const sizeElement = printElement.querySelector(".print-size");
            const priceElement = printElement.querySelector(".print-price");
            const selectedSize = sizeElement.value;
            const pricesData = sizeElement.dataset.prices;
            const price = getPrice(pricesData, selectedSize);
            priceElement.textContent = price;
        }
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

        printGrid.addEventListener("change", function (event) {
            if (event.target.classList.contains("print-size")) {
                handleBuyButtonClick(event);
            }
        });
    }
});
