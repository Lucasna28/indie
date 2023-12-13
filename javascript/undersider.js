document.addEventListener('DOMContentLoaded', function () {
    // Get the modal and modal image elements
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');

    // Get the image grid container
    const imageGrid = document.querySelector('.image-grid');

    // Attach a click event listener to the image grid container
    imageGrid.addEventListener('click', function (event) {
        if (event.target.tagName === 'IMG') {
            // Set the modal image source to the clicked image
            modalImg.src = event.target.src;

            // Display the modal
            modal.style.display = 'block';
        }
    });

    // Function to close the modal
    window.closeModal = function () {
        modal.style.display = 'none';
    };

    // Function to change the modal image
    window.changeImage = function (offset) {
        const images = document.querySelectorAll('.image-grid img');
        const currentImageSrc = modalImg.src;

        for (let i = 0; i < images.length; i++) {
            if (images[i].src === currentImageSrc) {
                const nextIndex = (i + offset + images.length) % images.length;
                modalImg.src = images[nextIndex].src;
                break;
            }
        }
    };
});

function goToPortfolio() {
    window.location.href = "/undersider/portfolio.html";
}
