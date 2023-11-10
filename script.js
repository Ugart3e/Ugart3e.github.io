const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');

let currentIndex = 0;

function showSlide(index) {
    if (index < 0) {
        currentIndex = slides.length - 1;
    } else if (index >= slides.length) {
        currentIndex = 0;
    }

    slides.forEach((slide, i) => {
        if (i === currentIndex) {
            slide.style.order = '1';
        } else if (i === (currentIndex + 1) % slides.length || i === (currentIndex - 2 + slides.length) % slides.length) {
            slide.style.order = '2';
        } else {
            slide.style.order = '3';
        }
    });
}

prevButton.addEventListener('click', () => {
    currentIndex--;
    showSlide(currentIndex);
});

nextButton.addEventListener('click', () => {
    currentIndex++;
    showSlide(currentIndex);
});

showSlide(currentIndex);
