document.addEventListener("DOMContentLoaded", function () {
    let currentSlide = 0;
    const slides = document.querySelectorAll(".slide");
    const totalSlides = slides.length;

    function showSlide(index) {
        if (index < 0) {
            currentSlide = totalSlides - 1;
        } else if (index >= totalSlides) {
            currentSlide = 0;
        } else {
            currentSlide = index;
        }

        const transformValue = -currentSlide * 100 + "%";
        document.getElementById("slideshow").style.transform = `translateX(${transformValue})`;
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    // Optional: Add buttons to navigate through the slides
    document.getElementById("slideshow").insertAdjacentHTML(
        "afterend",
        `
        <button onclick="prevSlide()">Previous</button>
        <button onclick="nextSlide()">Next</button>
        `
    );

    // Optional: Automatically advance to the next slide every 3 seconds
    setInterval(nextSlide, 3000);
});

   // JavaScript for at få knappen til at virke
   document.getElementById('backBtn').addEventListener('click', function() {
    window.location.href = "/undersider/portfolio.html"; // Ændre URL'en efter behov
});

// modal.js

document.addEventListener('DOMContentLoaded', function () {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modalContainer = document.querySelector('.modal-container');
    const modalContent = document.querySelector('.modal-content');
    const closeBtn = document.querySelector('.close-btn');

    galleryItems.forEach(function (item) {
        item.addEventListener('click', function () {
            const imageUrl = item.src;
            const modalImage = document.createElement('img');
            modalImage.src = imageUrl;
            modalImage.classList.add('modal-image');

            modalContent.innerHTML = '';
            modalContent.appendChild(modalImage);

            modalContainer.style.display = 'flex';
        });
    });

    closeBtn.addEventListener('click', function () {
        modalContainer.style.display = 'none';
    });

    window.addEventListener('click', function (event) {
        if (event.target === modalContainer) {
            modalContainer.style.display = 'none';
        }
    });
});
