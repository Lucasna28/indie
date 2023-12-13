document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const imageGrid = document.querySelector('.image-grid');

    imageGrid.addEventListener('click', function (event) {
        if (event.target.tagName === 'IMG') {
            modalImg.src = event.target.src;

            modal.style.display = 'block';
        }
    });

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
