var TxtRotate = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.fullTxt = "";
  this.tick();
};

TxtRotate.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var txt = this.toRotate[i];
  var fullTxt = this.fullTxt + txt.charAt(this.fullTxt.length);

  if (fullTxt === txt) {
    // Text has completed typing
    this.el.innerHTML = '<span class="wrap">' + fullTxt + "</span>";
  } else {
    this.el.innerHTML = '<span class="wrap">' + fullTxt + "</span>";
    var that = this;
    setTimeout(function () {
      that.tick();
    }, this.period);
  }

  this.fullTxt = fullTxt;
};

window.addEventListener("DOMContentLoaded", function () {
  var elements = document.getElementsByClassName("txt-rotate");

  for (var i = 0; i < elements.length; i++) {
    var toRotate = JSON.parse(elements[i].getAttribute("data-rotate"));
    var period = elements[i].getAttribute("data-period");
    if (toRotate) {
      new TxtRotate(elements[i], toRotate, period);
    }
  }
});

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
  "static/images/why1.png",
  "static/images/why2.png",
  "static/images/why3.png",
  "static/images/why4.png",
  "static/images/why4.png",
  "static/images/why4.png",
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

  let linkTag = document.getElementById("linkTag");
  linkTag.href = imgObject[mainImg];

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
const rectangle1 = document.getElementById("rectangle1");
const rectangle2 = document.getElementById("rectangle2");
const rectangle3 = document.getElementById("rectangle3");

let activeRectangle = null;

rectangle1.addEventListener("click", function () {
  handleClick(0);
});

rectangle2.addEventListener("click", function () {
  handleClick(1);
});

rectangle3.addEventListener("click", function () {
  handleClick(2);
});

function handleClick(index) {
  if (activeRectangle === index) {
    // Clicked the same rectangle twice, set back to default image
    activeRectangle = null;
    blockHow.style.backgroundImage = 'url("static/images/Frame 17.svg")';
  } else {
    // Clicked a different rectangle, change the image
    activeRectangle = index;
    switch (index) {
      case 0:
        blockHow.style.backgroundImage = 'url("static/images/Frame 18.svg")';
        break;
      case 1:
        blockHow.style.backgroundImage = 'url("static/images/Frame 19.svg")';
        break;
      case 2:
        blockHow.style.backgroundImage = 'url("static/images/Frame 20.svg")';
        break;
      default:
        break;
    }
  }
}

//Rules Animation
window.addEventListener("scroll", function () {
  const squares = document.querySelectorAll(".square");
  const triggerBottom = window.innerHeight * 0.8;

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
