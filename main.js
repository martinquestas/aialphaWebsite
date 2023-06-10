var TxtRotate = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = "";
  this.onCompleteCallback = null; // Added property for onComplete callback
  this.isDeleting = false;
  this.tick();
};

TxtRotate.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

  var that = this;
  var delta = 60; // Adjust the typing speed here

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    if (i === 0) {
      // If "HELLO." is fully displayed
      this.isDeleting = true;
      delta = 1000; // Add a delay before starting to delete
    } else if (i === 1 && typeof this.onCompleteCallback === "function") {
      // Execute onComplete callback when "WELCOME TO AI ALPHA" is fully displayed
      this.onCompleteCallback();
    }
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

window.addEventListener("DOMContentLoaded", function () {
  var elements = document.getElementsByClassName("txt-rotate");
  var foundWelcomeAlpha = false; // Flag variable
  var foundSubTxtRotate = false; // Flag variable

  for (var i = 0; i < elements.length; i++) {
    var toRotate = JSON.parse(elements[i].getAttribute("data-rotate"));
    var period = elements[i].getAttribute("data-period");
    if (toRotate) {
      var txtRotate = new TxtRotate(elements[i], toRotate, period);
      console.log("LOL1");
      if (toRotate.includes("WELCOME TO AI ALPHA")) {
        // Check if it's the element for "WELCOME TO AI ALPHA"
        console.log("Finished typing 'WELCOME TO AI ALPHA'");
        txtRotate.onCompleteCallback = function () {
          if (!foundSubTxtRotate) {
            var subTxtRotate =
              document.getElementsByClassName("subtxt-rotate")[0];
            var subTxtToRotate = JSON.parse(
              subTxtRotate.getAttribute("data-rotate")
            );
            var subTxtPeriod = subTxtRotate.getAttribute("data-period");
            new TxtRotate(subTxtRotate, subTxtToRotate, subTxtPeriod);
            console.log("Started typing subtxt-rotate");
            foundSubTxtRotate = true; // Set the flag to true
          }
        };
        foundWelcomeAlpha = true; // Set the flag to true
      }
    }
  }

  if (!foundWelcomeAlpha) {
    console.log("Did not find 'WELCOME TO AI ALPHA' element");
  }
});

//Text Writing-Deleting END

//Burger Menu
/* 
document.getElementById("active").checked = false;
document.getElementById("menu1").style.display = "none";
document.getElementById("menu2").style.display = "none";
document.getElementById("menu3").style.display = "none";

active.onclick = function () {
  document.getElementById("burger").style.display = "block";
  document.getElementById("menu1").style.display = "block";
  document.getElementById("menu2").style.display = "block";
  document.getElementById("menu3").style.display = "block";
  if (document.getElementById("active").clicked == false) {
    document.getElementById("burger").style.display = "none";
    document.getElementById("menu1").style.display = "none";
    document.getElementById("menu2").style.display = "none";
    document.getElementById("menu3").style.display = "none";
  }
};

menu1.onclick = function () {
  document.getElementById("burger").style.display = "none";
  document.getElementById("menu1").style.display = "none";
  document.getElementById("menu2").style.display = "none";
  document.getElementById("menu3").style.display = "none";
  if (document.getElementById("active").checked) {
    document.getElementById("active").checked = false;
    document.getElementById("burger").style.display = "block";
    document.getElementById("menu1").style.display = "none";
    document.getElementById("menu2").style.display = "none";
    document.getElementById("menu3").style.display = "none";
  }
};
menu2.onclick = function () {
  document.getElementById("burger").style.display = "none";
  document.getElementById("menu1").style.display = "none";
  document.getElementById("menu2").style.display = "none";
  document.getElementById("menu3").style.display = "none";
  if (document.getElementById("active").checked) {
    document.getElementById("active").checked = false;
    document.getElementById("burger").style.display = "block";
    document.getElementById("menu1").style.display = "none";
    document.getElementById("menu2").style.display = "none";
    document.getElementById("menu3").style.display = "none";
  }
};
menu3.onclick = function () {
  document.getElementById("burger").style.display = "none";
  document.getElementById("menu1").style.display = "none";
  document.getElementById("menu2").style.display = "none";
  document.getElementById("menu3").style.display = "none";
  if (document.getElementById("active").checked) {
    document.getElementById("active").checked = false;
    document.getElementById("burger").style.display = "block";
    document.getElementById("menu1").style.display = "none";
    document.getElementById("menu2").style.display = "none";
    document.getElementById("menu3").style.display = "none";
  }
};
*/
//Burger Menu END
//Reveal elements on scroll
window.addEventListener("scroll", reveal);
function reveal() {
  var reveals = document.querySelectorAll(".reveal");
  for (var i = 0; i < reveals.length; i++) {
    var windowheight = window.innerHeight;
    var revealtop = reveals[i].getBoundingClientRect().top;
    var revealpoint = 150;

    if (revealtop < windowheight - revealpoint) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
}
//Reveal elements on scroll ENDD

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
