// Billeder og indeks
const images = [
    "./billeder/slideshow-billeder/IMG_2333-kopi.jpg",
    "./billeder/slideshow-billeder/IMG_2568-kopi.jpg",
    "./billeder/slideshow-billeder/IMG_2808-kopi.jpg",
    "./billeder/slideshow-billeder/IMG_2343-kopi.jpg",
    "./billeder/slideshow-billeder/IMG_2783-kopi.jpg"
  ];
  
  let currentIndex = 0;
  const radioInputs = document.querySelectorAll("input[type=radio]");
  let autoChangeInterval; // Variabel til at gemme timeren
  
  // Funktion til at opdatere det valgte billede og markere den tilsvarende radio

  function updateSelectedImage(imageIndex) {
    const selectedImage = document.getElementById("selected");
    selectedImage.src = images[imageIndex];
  
    // Markér den tilsvarende radio-input som checked
    radioInputs.forEach((radio, index) => {
      radio.checked = index === imageIndex;
    });
  }
  
  // Funktion til at navigere til det forrige billede
  function navigatePrevious() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateSelectedImage(currentIndex);
  }
  
  // Funktion til at navigere til det næste billede
  function navigateNext() {
    currentIndex = (currentIndex + 1) % images.length;
    updateSelectedImage(currentIndex);
  }
  
  // Funktion til at skifte billedet baseret på den markerede radio
  function autoChangeImage() {
    const checkedRadioIndex = [...radioInputs].findIndex((radio) => radio.checked);
    if (checkedRadioIndex !== -1) {
      currentIndex = (checkedRadioIndex + 1) % images.length;
    } else {
      currentIndex = (currentIndex + 1) % images.length;
    }
    updateSelectedImage(currentIndex);
  }
  
  // Tilføj eventlistener til knapperne
  const prevButton = document.querySelector(".prev-button");
  const nextButton = document.querySelector(".next-button");
  
  prevButton.addEventListener("click", navigatePrevious);
  nextButton.addEventListener("click", navigateNext);
  

  radioInputs.forEach((radio, index) => {
    radio.addEventListener("change", function () {
      if (this.checked) {
        updateSelectedImage(index);
      }
    });
  });
  

  updateSelectedImage(currentIndex);
  
  // Start timeren for automatisk billedskift
  autoChangeInterval = setInterval(autoChangeImage, 2500); // 25000 millisekunder (2,5 sekunder)
  
  // Pause autoChangeImage når der bliver hover over #selected
  document.getElementById("selected").addEventListener("mouseenter", function () {
    clearInterval(autoChangeInterval);
  });
  
  // Genstart autoChangeImage når du ikke længere hover over #selected
  document.getElementById("selected").addEventListener("mouseleave", function () {
    autoChangeInterval = setInterval(autoChangeImage, 2500); // Start interval igen
  });
  