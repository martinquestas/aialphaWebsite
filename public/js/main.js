// Video player

document.addEventListener("DOMContentLoaded", function () {
  var videoElement = document.getElementById("bg");
  videoElement.play();
});

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

let mobileImgObject = [
  "static/images/why1mobile.svg",
  "static/images/why2mobile.svg",
  "static/images/why3mobile.svg",
  "static/images/why4mobile.svg",
];

let mainImg = 0;
let prevImg = imgObject.length - 1;
let nextImg = 1;

function loadGallery() {
  let isMobile = window.innerWidth < 768;

  let mainView = document.getElementById("mainView");
  let leftView = document.getElementById("leftView");
  let rightView = document.getElementById("rightView");

  mainView.style.transition = "none"; // Disable transition
  leftView.style.transition = "none"; // Disable transition
  rightView.style.transition = "none"; // Disable transition

  mainView.style.backgroundImage = `url(${
    isMobile ? mobileImgObject[mainImg] : imgObject[mainImg]
  })`;
  leftView.style.backgroundImage = `url(${
    isMobile ? mobileImgObject[prevImg] : imgObject[prevImg]
  })`;
  rightView.style.backgroundImage = `url(${
    isMobile ? mobileImgObject[nextImg] : imgObject[nextImg]
  })`;

  setActiveDot(mainImg);

  setTimeout(() => {
    mainView.style.transition = ""; // Restore transition after setting background
    leftView.style.transition = ""; // Restore transition after setting background
    rightView.style.transition = ""; // Restore transition after setting background
  }, 0);
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

// Keep track of the current active class
let activeClass = null;

function activateClass(newClass) {
  // If there's an active class, remove it
  if (activeClass) {
    blockHow.classList.remove(activeClass);
  }

  // Add the new class and set it as the active class
  blockHow.classList.add(newClass);
  activeClass = newClass;
}

rectangles.forEach((rectangle, index) => {
  rectangle.addEventListener("mouseenter", function () {
    activateClass(`hovered-${index + 1}`);
  });

  rectangle.addEventListener("mouseleave", function () {
    if (activeClass) {
      blockHow.classList.remove(activeClass);
    }
    activeClass = null;
  });

  rectangle.addEventListener("touchstart", function (e) {
    e.preventDefault(); // Prevents the window from scrolling
    activateClass(`hovered-${index + 1}`);
  });

  rectangle.addEventListener("click", function (e) {
    e.preventDefault(); // Prevents any unwanted behaviour
    activateClass(`hovered-${index + 1}`);
  });
});

//HowToGraphic
const blockHowTo = document.querySelector(".blockHowTo");
const rectanglesTo = document.querySelectorAll(".rectangleTo");

// Function to remove all possible classes
function removeClasses() {
  for (let i = 0; i < rectanglesTo.length; i++) {
    blockHowTo.classList.remove(`hoveredTo-${i + 1}`);
  }
}

rectanglesTo.forEach((rectangleTo, index) => {
  rectangleTo.addEventListener("mouseenter", function () {
    removeClasses();
    blockHowTo.classList.add(`hoveredTo-${index + 1}`);
  });

  // Added touch events
  rectangleTo.addEventListener("touchstart", function () {
    removeClasses();
    blockHowTo.classList.add(`hoveredTo-${index + 1}`);
  });
});

//HowToGraphic END
//Pricing Animation
const cardRectangle11 = document.getElementById("cardRectangle11");
const cardRectangle = document.getElementById("cardRectangle2");
const cardHuge = document.querySelector(".card.huge");

let originalImage = cardHuge.style.backgroundImage;
let newImage = "url('static/images/card22.svg')";
let isOriginalImage = true;

cardRectangle.addEventListener("click", function () {
  if (isOriginalImage) {
    cardRectangle11.style.display = "none"; // Hide cardRectangle11
    cardHuge.style.backgroundImage = newImage;
    cardRectangle.style.top = "770px";
  } else {
    cardRectangle11.style.display = "block"; // Show cardRectangle11
    cardHuge.style.backgroundImage = originalImage;
    cardRectangle.style.top = "-160px";
  }

  isOriginalImage = !isOriginalImage;
});
//Pricing Mobile
const cardRectangleMobile = document.getElementById("cardRectangle2Mobile");
const pricingCarouselImageMobile = document.getElementById("pricing2Mobile");
const pricingCarouselImage22Mobile = document.getElementById("pricing22Mobile");
const cardRectangle111 = document.getElementById("cardRectangle111");

cardRectangleMobile.addEventListener("click", function () {
  if (getComputedStyle(pricingCarouselImageMobile).opacity !== "0") {
    pricingCarouselImageMobile.style.opacity = "0";
    pricingCarouselImage22Mobile.style.opacity = "1";
    cardRectangle111.style.display = "none";
    cardRectangleMobile.style.top = "auto";
    cardRectangleMobile.style.bottom = "0";
  } else {
    pricingCarouselImage22Mobile.style.opacity = "0";
    pricingCarouselImageMobile.style.opacity = "1";
    cardRectangle111.style.display = "block";
    cardRectangleMobile.style.top = "0";
    cardRectangleMobile.style.bottom = "auto";
  }
});

//Pricing Mobile End

//Price Animation END
//Our Story Desktop
window.addEventListener("DOMContentLoaded", (event) => {
  const btn1 = document.getElementById("btn1");
  const btn2 = document.getElementById("btn2");
  const btn3 = document.getElementById("btn3");

  const img1 = document.getElementById("img1");
  const img2 = document.getElementById("img2");
  const img3 = document.getElementById("img3");
  const img4 = document.getElementById("img4");

  img1.style.opacity = 1;

  btn1.addEventListener("mouseover", () => {
    img1.style.opacity = 0;
    img2.style.opacity = 1;
    img3.style.opacity = 0;
    img4.style.opacity = 0;
  });

  btn2.addEventListener("mouseover", () => {
    img1.style.opacity = 0;
    img2.style.opacity = 0;
    img3.style.opacity = 1;
    img4.style.opacity = 0;
  });

  btn3.addEventListener("mouseover", () => {
    img1.style.opacity = 0;
    img2.style.opacity = 0;
    img3.style.opacity = 0;
    img4.style.opacity = 1;
  });

  btn1.addEventListener("mouseout", () => {
    img1.style.opacity = 1;
    img2.style.opacity = 0;
    img3.style.opacity = 0;
    img4.style.opacity = 0;
  });

  btn2.addEventListener("mouseout", () => {
    img1.style.opacity = 1;
    img2.style.opacity = 0;
    img3.style.opacity = 0;
    img4.style.opacity = 0;
  });

  btn3.addEventListener("mouseout", () => {
    img1.style.opacity = 1;
    img2.style.opacity = 0;
    img3.style.opacity = 0;
    img4.style.opacity = 0;
  });
});

//Our Story Desktop END
//R&R Desktop
let images = Array.from(document.querySelectorAll(".carousel-image"));
let gifs = Array.from(document.querySelectorAll(".gif-inner"));
let buttons = Array.from(document.querySelectorAll(".invisible-button"));

buttons.forEach((button) => {
  button.addEventListener("click", function () {
    let imageIndex = parseInt(button.getAttribute("data-image-index"), 10);

    images.forEach((image, index) => {
      if (index === imageIndex) {
        image.classList.add("active");
      } else {
        image.classList.remove("active");
      }
    });

    gifs.forEach((gif, index) => {
      if (index === imageIndex) {
        gif.style.opacity = "1";
      } else {
        gif.style.opacity = "0";
      }
    });
  });
});

//R&R Desktop END
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

//Our Story Mobile

document.addEventListener("DOMContentLoaded", function () {
  const mobileStory = document.getElementById("mobileStory");
  const rectangles = Array.from(
    mobileStory.getElementsByClassName("rectangleMobileStory")
  );
  const images = Array.from(mobileStory.getElementsByClassName("storyImage"));

  rectangles.forEach((rectangle, index) => {
    rectangle.addEventListener("click", function () {
      images.forEach((image) => {
        image.style.opacity = "0";
      });
      images[index].style.opacity = "1";
    });
  });
});

//Privacy Policy and more
// Store the original state
var originalMainContentDisplay =
  document.getElementById("main-content").style.display;
var originalLinkContentActive;

function showContent(id) {
  // If there was a previously active link content, store its ID
  var elements = document.getElementsByClassName("link-content");
  for (var i = 0; i < elements.length; i++) {
    if (elements[i].classList.contains("active")) {
      originalLinkContentActive = elements[i].id;
      break;
    }
  }

  // Save the current state to the history
  window.history.pushState(null, null);

  // Hide the main content
  document.getElementById("main-content").style.display = "none";

  // Hide all link-content elements and show the selected content by id
  for (var i = 0; i < elements.length; i++) {
    elements[i].classList.remove("active");
  }
  document.getElementById(id).classList.add("active");

  // Scroll to the top of the page
  window.scrollTo(0, 0);
}

window.addEventListener("popstate", function (event) {
  // Restore the original state
  document.getElementById("main-content").style.display =
    originalMainContentDisplay;
  var elements = document.getElementsByClassName("link-content");
  for (var i = 0; i < elements.length; i++) {
    elements[i].classList.remove("active");
  }
  if (originalLinkContentActive) {
    document.getElementById(originalLinkContentActive).classList.add("active");
  }
});

//Privacy Policy and more END
//Verify Captcha
document.getElementById("form").addEventListener("submit", function (event) {
  var recaptcha = document.querySelector("#g-recaptcha-response").value;
  if (recaptcha === "") {
    event.preventDefault();
    alert("Please verify the reCAPTCHA.");
  }
});
//Verify Captcha END
