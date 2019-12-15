import { ScrollMaster } from "./js/scrollMaster.js";
import { Navbar } from "./js/navbar";
import { Offer } from "./js/offer";
import { formValidation } from "./js/formValidation";
import './scss/main.scss';
import { log } from "util";
import { Map } from "./js/mapHandler";




/*   APP JS   */
// Loading element from DOM
const elements = {
  navbar: document.querySelector(".navbar"),
  brand: document.querySelector(".navbar__brand"),
  content: document.querySelector(".navbar__content"),
  button: document.querySelector(".navbar__button"),
  svg : document.querySelector(".navbar__ham"),
  logo : document.querySelector(".masthead__logo"),
  suppliers : document.querySelectorAll('.supplier'),
  form: document.querySelector('.form')
};

const wineArtPos = {
  lat: 49.4558978,
  lng: 14.3633936
};

// Init Classes
const navbar = new Navbar(elements);
const smoothScroll = new ScrollMaster(1000);
const map = new Map();



// Event Listeners
// DOM Content Loaded
document.addEventListener("DOMContentLoaded", () => {
  smoothScroll.init();
  navbar.changeBackroundColor();
  const formValidator = new formValidation(elements.form);

  loadMap();
});

async function loadMap() {
  let mapElement = document.getElementById('mapID');
  const gmap = await Map.loadGoogleMapsApi();
  await Map.createMap(gmap, mapElement, wineArtPos);
}


window.onload = () => { new Offer();};



// Window onScroll Listener
window.onscroll = () => navbar.changeBackroundColor();
// Window onResize Listener
window.onresize = () => {
  navbar.changeNavbarBasedOnWindowSize();
}

