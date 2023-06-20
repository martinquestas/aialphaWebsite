const sentences = [
  "HELLO.",
  "WELCOME TO AI ALPHA.",
  "I am the first AI Crypto Virtual Assistant.",
  "How may I help you today?",
];
const typingTextElements = document.querySelectorAll(".typing-text");

function typeText(element, text) {
  let currentCharIndex = 0;

  const typingInterval = setInterval(() => {
    if (currentCharIndex < text.length) {
      element.textContent += text.charAt(currentCharIndex);
      currentCharIndex++;
    } else {
      clearInterval(typingInterval);
    }
  }, 50);
}

function startTypingAnimation() {
  let delay = 0;

  typingTextElements.forEach((element, index) => {
    const sentence = sentences[index];
    setTimeout(() => {
      typeText(element, sentence);
    }, delay);
    delay += sentence.length * 100 + 10;
    if (index < typingTextElements.length - 1) {
      delay += 10; // Delay between sentences
    }
  });
}

setTimeout(startTypingAnimation, 1000);

//Text Writing-Deleting END

//Burger Menu

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-right ul");
const navLinksItems = document.querySelectorAll(".nav-right ul li");

hamburger.addEventListener("click", function () {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
});

// Close the hamburger menu when a title within the <li> elements is clicked
navLinksItems.forEach((item) => {
  item.addEventListener("click", function () {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
  });
});

//Burger Menu END

//Get all the hyperlink elements
var links = document.getElementsByTagName("a");

//Browse the previously created array
Array.prototype.forEach.call(links, function (elem, index) {
  //Get the hyperlink target and if it refers to an id go inside condition
  var elemAttr = elem.getAttribute("href");
  if (elemAttr && elemAttr.includes("#")) {
    //Replace the regular action with a scrolling to target on click
    elem.addEventListener("click", function (ev) {
      ev.preventDefault();
      //Scroll to the target element using replace() and regex to find the href's target id
      document.getElementById(elemAttr.replace(/#/g, "")).scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    });
  }
});

//CAROUSEL

const dotsContainer = document.getElementById("dotsContainer");
const dots = Array.from(dotsContainer.getElementsByClassName("dot"));

function setActiveDot(index) {
  dots.forEach((dot, dotIndex) => {
    dot.classList.toggle("active", dotIndex === index);
  });
}

let imgObject = [
  "static/images/why1.svg",
  "static/images/why2.svg",
  "static/images/why3.svg",
  "static/images/why4.svg",
];

let mainImg = 0;
let prevImg = imgObject.length - 1;
let nextImg = 1;

function loadGallery() {
  let mainView = document.getElementById("mainView");
  mainView.style.background = "url(" + imgObject[mainImg] + ")";

  let leftView = document.getElementById("leftView");
  leftView.style.background = "url(" + imgObject[prevImg] + ")";

  let rightView = document.getElementById("rightView");
  rightView.style.background = "url(" + imgObject[nextImg] + ")";

  setActiveDot(mainImg);
}

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => handleDotClick(index));
});

function scrollRight() {
  prevImg = mainImg;
  mainImg = nextImg;
  if (nextImg >= imgObject.length - 1) {
    nextImg = 0;
  } else {
    nextImg++;
  }
  loadGallery();
}

function scrollLeft() {
  nextImg = mainImg;
  mainImg = prevImg;

  if (prevImg === 0) {
    prevImg = imgObject.length - 1;
  } else {
    prevImg--;
  }
  loadGallery();
}

document.getElementById("navRight").addEventListener("click", scrollRight);
document.getElementById("navLeft").addEventListener("click", scrollLeft);
document.getElementById("rightView").addEventListener("click", scrollRight);
document.getElementById("leftView").addEventListener("click", scrollLeft);
document.addEventListener("keyup", function (e) {
  if (e.keyCode === 37) {
    scrollLeft();
  } else if (e.keyCode === 39) {
    scrollRight();
  }
});

loadGallery();

//HowGraphic
const blockHow = document.querySelector(".blockHow");
const rectangles = document.querySelectorAll(".rectangle");

rectangles.forEach((rectangle, index) => {
  rectangle.addEventListener("mouseenter", function () {
    blockHow.classList.add(`hovered-${index + 1}`);
  });

  rectangle.addEventListener("mouseleave", function () {
    blockHow.classList.remove(`hovered-${index + 1}`);
  });
});

//HowToGraphic
const blockHowTo = document.querySelector(".blockHowTo");
const rectanglesTo = document.querySelectorAll(".rectangleTo");

rectanglesTo.forEach((rectangleTo, index) => {
  rectangleTo.addEventListener("mouseenter", function () {
    blockHowTo.classList.add(`hoveredTo-${index + 1}`);
  });

  rectangleTo.addEventListener("mouseleave", function () {
    blockHowTo.classList.remove(`hoveredTo-${index + 1}`);
  });
});

//HowToGraphic END
//Pricing Animation
const cardRectangle = document.getElementById("cardRectangle2");
const cardHuge = document.querySelector(".card.huge");

let originalImage = cardHuge.style.backgroundImage;
let newImage = "url('static/images/card22.svg')";
let isOriginalImage = true;

cardRectangle.addEventListener("click", function () {
  if (isOriginalImage) {
    cardHuge.style.backgroundImage = newImage;
    cardRectangle.style.top = "670px";
  } else {
    cardHuge.style.backgroundImage = originalImage;
    cardRectangle.style.top = "-120px";
  }

  isOriginalImage = !isOriginalImage;
});

//Price Animation END
//Rules Animation
window.addEventListener("scroll", function () {
  const squares = document.querySelectorAll(".square");
  const triggerBottom = window.innerHeight * 1.2;

  squares.forEach((square, index) => {
    const squareTop = square.getBoundingClientRect().top;

    if (squareTop < triggerBottom) {
      square.style.opacity = 1;
      square.style.transform = "translateX(0)"; // Reset the transform to 0 for the initial state
      square.style.transition = "opacity 1s ease, transform 1s ease"; // Add transition for opacity and transform
      setTimeout(() => {
        square.style.transform = "translateX(0%)"; // Slide animation by setting the transform to 0%
      }, index * 200); // Delay the animation based on the index to create a sequential effect
    } else {
      square.style.opacity = 0;
      square.style.transform = "translateX(-100%)"; // Move the element off the screen
      square.style.transition = "opacity 0.5s ease, transform 0.5s ease"; // Add transition for opacity and transform
    }
  });
});
//Our Story
// Get all the titleStory elements
const titles = document.querySelectorAll(".titleStory");

// Add click event listener to each titleStory
titles.forEach((title) => {
  title.addEventListener("click", function () {
    // Get the corresponding contentStory element
    const content = this.nextElementSibling;

    // Toggle the visibility of the contentStory
    content.classList.toggle("show");

    // Toggle the border radius of the titleStory
    this.classList.toggle("no-border-radius");

    // Toggle the arrow orientation
    const arrow = this.querySelector(".arrowStory");
    arrow.classList.toggle("upside-down");
  });
});
