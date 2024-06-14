const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slider .slides img');
const prevArrow = document.querySelector('.slider .arrows .prev');
const nextArrow = document.querySelector('.slider .arrows .next');

let currentSlide = 0;

function moveSlide(direction) {
  currentSlide = currentSlide + direction;

  if (currentSlide < 0) {
    currentSlide = slides.length - 1;
  } else if (currentSlide >= slides.length) {
    currentSlide = 0;
  }

  slider.querySelector('.slides').style.transform = `translateX(-${currentSlide * slider.offsetWidth}px)`;
}

prevArrow.addEventListener('click', () => moveSlide(-1));
nextArrow.addEventListener('click', () => moveSlide(1));

const daysLeftElement = document.querySelector('.days-left');
const weekLeftElement = document.querySelector('.weeks-left');
// Function to calculate and display days left
function calculateDaysLeft() {
  const today = new Date();
  const yearEnd = new Date(today.getFullYear(), 10, 26); // December 31st of the current year
  const diffInMs = yearEnd - today;
  const daysLeft = Math.ceil(diffInMs / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
  const weekLeft = Math.floor(daysLeft/7)
  // Update the content with calculated days left and current year
 daysLeftElement.textContent = ""; // Clear previous content
 weekLeftElement.textContent=""
 // Create individual spans for each digit and style based on remaining days
  const daysLeftString = daysLeft.toString();
  for (let i = 0; i < daysLeftString.length; i++) {
    const digitSpan = document.createElement('span');
    digitSpan.textContent = daysLeftString[i];

    if (daysLeft > 200) {
      daysLeftElement.classList.add('green');
    } else if (daysLeft <= 200 && daysLeft > 120) {
      daysLeftElement.classList.add('yellow');
    } else if (daysLeft <= 120 && daysLeft > 60) {
      daysLeftElement.classList.add('orange');
    } else {
      daysLeftElement.classList.add('red');
    }
      // const difspan=document.createElement('h6');
      // difspan.textContent="Padhle Bsdk";
    daysLeftElement.appendChild(digitSpan);

  }
  const WeekLeftString = weekLeft.toString();
  for(let i =0;i<WeekLeftString.length;i++){
    const difspan=document.createElement('span');
    difspan.textContent=WeekLeftString[i];
    if (weekLeft > 28) {
      weekLeftElement.classList.add('green');
    } else if (weekLeft <= 28 && weekLeft > 17) {
      weekLeftElement.classList.add('yellow');
    } else if (weekLeft <= 17 && weekLeft > 8) {
      weekLeftElement.classList.add('orange');
    } else {
      weekLeftElement.classList.add('red');
    }
    weekLeftElement.appendChild(difspan);
  }
}
// Call the function to calculate and display days left on page load
calculateDaysLeft();
// Script.js 

// Select the elements 

const video = document.getElementById('myVideo');
const lockButton = document.getElementById('lockButton');
const container = document.querySelector('.video-container');
const videoNameElement = document.querySelector('.video-name');

let isFullScreen = false;
let isLocked = false;

// Get video name from file path
const videoName = video.src.split('/').pop().split('.')[0]; // Extract filename without extension
videoNameElement.textContent = videoName;

// Function to handle full screen mode
lockButton.addEventListener('click', () => {
  if (!isFullScreen) {
    video.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
  isFullScreen = !isFullScreen;
});

// Handle lock mode based on full screen state
container.addEventListener('fullscreenchange', () => {
  isFullScreen = document.fullscreen;
  container.classList.toggle('locked', isFullScreen && isLocked);
  // Show title only in full screen mode
  videoNameElement.style.display = isFullScreen ? 'block' : 'none';
});

// Handle backward/forward with arrow keys (added after container click listener)
document.addEventListener('keydown', (event) => {
  if (isLocked) return; // Don't handle keys if locked

  const delta = (event.key === 'ArrowRight') ? 10 : -10; // Adjust time based on key
  const newTime = video.currentTime + delta;
  video.currentTime = Math.max(0, Math.min(newTime, video.duration));
});

// Prevent exiting full screen on click (optional) - ensure this happens after keydown listener
container.addEventListener('click', (event) => {
  if (isFullScreen && isLocked && event.target !== lockButton) {
    event.preventDefault(); // Prevent leaving full screen on click
  }
});

