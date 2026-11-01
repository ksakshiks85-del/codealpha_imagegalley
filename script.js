const images = document.querySelectorAll(".gallery img");

let currentIndex = 0;

// Create lightbox
const lightbox = document.createElement("div");
lightbox.className = "lightbox";

lightbox.innerHTML = `
    <span class="close">&times;</span>
    <button class="prev">&#10094;</button>
    <img class="lightbox-img">
    <button class="next">&#10095;</button>
`;

document.body.appendChild(lightbox);

const preview = lightbox.querySelector(".lightbox-img");
const closeBtn = lightbox.querySelector(".close");
const prevBtn = lightbox.querySelector(".prev");
const nextBtn = lightbox.querySelector(".next");

// Show selected image
function showImage(index) {
    currentIndex = (index + images.length) % images.length;
    preview.src = images[currentIndex].src;
    preview.alt = images[currentIndex].alt;
    lightbox.style.display = "flex";
}

// Open image on click
images.forEach((image, index) => {
    image.addEventListener("click", function() {
        showImage(index);
    });
});

// Next image
nextBtn.addEventListener("click", function() {
    showImage(currentIndex + 1);
});

// Previous image
prevBtn.addEventListener("click", function() {
    showImage(currentIndex - 1);
});

// Close lightbox
closeBtn.addEventListener("click", function() {
    lightbox.style.display = "none";
});

// Close when clicking outside image
lightbox.addEventListener("click", function(event) {
    if (event.target === lightbox) {
        lightbox.style.display = "none";
    }
});

// Keyboard navigation
document.addEventListener("keydown", function(event) {
    if (lightbox.style.display === "flex") {
        if (event.key === "ArrowRight") {
            showImage(currentIndex + 1);
        }

        if (event.key === "ArrowLeft") {
            showImage(currentIndex - 1);
        }

        if (event.key === "Escape") {
            lightbox.style.display = "none";
        }
    }
});