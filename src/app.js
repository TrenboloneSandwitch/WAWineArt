import { ScrollMaster } from "./js/scrollMaster.js";
import { Navbar } from "./js/navbar";
import { Offer } from "./js/offer";
import './scss/main.scss';





/*   APP JS   */

// Loading element from DOM
const elements = {
  navbar: document.querySelector(".navbar"),
  brand: document.querySelector(".navbar__brand"),
  content: document.querySelector(".navbar__content"),
  button: document.querySelector(".navbar__button"),
  svg : document.querySelector(".navbar__ham"),
  logo : document.querySelector(".masthead__logo"),
  suppliers : document.querySelectorAll('.supplier')
};

// Init Classes
const navbar = new Navbar(elements);
const smoothScroll = new ScrollMaster(elements.content ,1000, navbar);



// Event Listeners
// DOM Content Loaded
document.addEventListener("DOMContentLoaded", () => {
  smoothScroll.init();
  navbar.changeBackroundColor();
  
});

window.onload = () => { new Offer();};



// Window onScroll Listener
window.onscroll = () => navbar.changeBackroundColor();
// Window onResize Listener
window.onresize = () => {
  navbar.changeNavbarBasedOnWindowSize();
}

