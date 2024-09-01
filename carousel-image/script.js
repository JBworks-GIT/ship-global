const images = [
    'image1.jpg',
    'image2.jpg',
    'image3.jpg'
];

const fallbackImage = 'fallback.jpg';

function initializeCarousel() {
    const carouselImagesContainer = document.getElementById('carousel-images');
    const carouselIndicatorsContainer = document.getElementById('carousel-indicators');

    images.forEach((image, index) => {
        const imgElement = document.createElement('img');
        imgElement.src = image;
        imgElement.alt = `Image ${index + 1}`;
        imgElement.onerror = () => {
            imgElement.src = fallbackImage;
        };

        carouselImagesContainer.appendChild(imgElement);

        const dotElement = document.createElement('span');
        dotElement.className = 'dot';
        dotElement.onclick = () => currentSlide(index + 1);

        carouselIndicatorsContainer.appendChild(dotElement);
    });

    showSlides(slideIndex);
}

let slideIndex = 1;
initializeCarousel();

function nextSlide() {
    showSlides(slideIndex += 1);
}

function prevSlide() {
    showSlides(slideIndex -= 1);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    const slides = document.querySelectorAll(".carousel-images img");
    const dots = document.querySelectorAll(".dot");

    if (n > slides.length) {
        slideIndex = 1;
    }

    if (n < 1) {
        slideIndex = slides.length;
    }

    slides.forEach((slide, index) => {
        slide.style.transform = `translateX(${-100 * (slideIndex - 1)}%)`;
    });

    dots.forEach(dot => dot.classList.remove("active"));
    dots[slideIndex - 1].classList.add("active");
}
