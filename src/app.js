import { ScrollMaster } from "./js/scrollMaster.js";
import { Navbar } from "./js/navbar";
import { formValidation } from "./js/formValidation";
import "./scss/main.scss";
import { Map } from "./js/mapHandler";
import { Translation } from "./js/translation";
import { Suppliers } from "./js/suppliers";
import AOS from 'aos';
import 'aos/dist/aos.css';


/*   APP JS   */
// Loading element from DOM
const elements = {
  navbar: document.querySelector(".navbar"),
  brand: document.querySelector(".navbar__brand"),
  content: document.querySelector(".navbar__content"),
  button: document.querySelector(".navbar__button"),
  svg: document.querySelector(".navbar__ham"),
  logo: document.querySelector(".masthead__logo"),
  suppliers: document.querySelectorAll(".supplier"),
  form: document.querySelector(".form"),
  langElements: document.querySelectorAll("[data-lang]")
};

// Init Classes

const wineArtPos = {
  lat: 49.4558978,
  lng: 14.3633936
};

// Event Listeners
// DOM Content Loaded
document.addEventListener("DOMContentLoaded", () => {
  const navbar = new Navbar(elements);
  const smoothScroll = new ScrollMaster(1000);
  
  new formValidation(elements.form);
  const suppliers = new Suppliers();
  suppliers.loadData();


  smoothScroll.init();
  navbar.changeBackroundColor();
  fillDOM();
  loadMap();
  AOS.init({
    delay: 50,
    duration: 400,
  });

  // Window onScroll Listener
  window.onscroll = () => navbar.changeBackroundColor();
  // Window onResize Listener
  window.onresize = () => {
    navbar.changeNavbarBasedOnWindowSize();
  };
});

async function fillDOM() {
  const Translator = new Translation();
  const lang = localStorage.getItem("siteLang") ? localStorage.getItem("siteLang") : 'cs';
  
  await Translator.translateFromJSON(lang, "../../assets/data/lang_obj.json", elements.langElements,'data-lang');
  
  const sourceObject = lang === 'en' ? ['John Doe', 'Subject', 'your@e-mail.com', 'Current Year', 'Text of your message...']  : ['Karel Novák', 'Předmět', 'vas@e-mail.cz', 'Aktuální Rok', 'Text Vaší zprávy...'];
  Translator.translateAttribute(sourceObject, document.querySelectorAll('.form__input'), 'placeholder');

  const send = lang === 'en' ? 'SEND' : 'ODESLAT';
  document.querySelector('.form__button').setAttribute('value', send);
  
}

export async function loadMap() {
  new Map();
  let mapElement = document.getElementById("mapID");
  const gmap = await Map.loadGoogleMapsApi();
  await Map.createMap(gmap, mapElement, wineArtPos);
}
