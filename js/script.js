// script.js
function sayHello() {
  console.log("Hello, 这是外部 JS 文件中的代码！");
}

const carousel = document.querySelector('.lunbotu');
const wrapper = document.querySelector('.lunbotu-wrapper');
const items = document.querySelectorAll('.lunbotu-item');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let currentIndex = 0; 
const itemCount = items.length; 
const interval = 1500;
let timer = null; 


function goToSlide(index) {
if (index < 0) index = itemCount - 1;
if (index >= itemCount) index = 0;
currentIndex = index;
const offset = -currentIndex * carousel.offsetWidth;
wrapper.style.transform = `translateX(${offset}px)`;
}

function nextSlide() {
goToSlide(currentIndex + 1);
}

function prevSlide() {
goToSlide(currentIndex - 1);
}

function startAutoPlay() {
timer = setInterval(nextSlide, interval);
}

function stopAutoPlay() {
clearInterval(timer);
}

prevBtn.addEventListener('click', prevSlide); 
nextBtn.addEventListener('click', nextSlide);
carousel.addEventListener('mouseenter', stopAutoPlay); 
carousel.addEventListener('mouseleave', startAutoPlay); 

window.addEventListener('resize', () => {
const offset = -currentIndex * carousel.offsetWidth;
wrapper.style.transform = `translateX(${offset}px)`;
});

startAutoPlay();