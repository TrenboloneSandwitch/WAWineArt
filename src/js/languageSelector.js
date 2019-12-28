import { Translation } from "./translation";
const Translator = new Translation;
import { Suppliers } from "./suppliers";

import { loadMap } from "../app.js";

export class LanguageSelector {
  constructor(width, langElements, offer) {
    this.width = width;
    this.langElements = langElements;
  }

  getLanguageObject() {
    const containers = {
      active: "desktop",
      hidden: "mobile"
    };

    if (window.innerWidth < this.width) {
      containers.active = "mobile";
      containers.hidden = "desktop";
    }

    return {
      active: document.querySelector(
        `.language-selector--${containers.active}`
      ),
      hidden: document.querySelector(`.language-selector--${containers.hidden}`)
    };
  }

  placeLanguageSelector() {
    // Acces DOM for language selector
    const { active, hidden } = this.getLanguageObject();
    // Apply logic for displayin and placing element into the page
    if (hidden.style.display != "none") hidden.style.display = "none";
    if (active.style.display == "none") active.style.display = "block";
    if (active.childElementCount > 1) return;

    const activeLang = localStorage.getItem("siteLang") ? localStorage.getItem("siteLang") : 'cs';
    if (activeLang) {
      let html;
      if (activeLang === 'cs') {
        html = `
        <a href="#cs" class="lang active"> 
        <span class="flag-icon flag-icon-cz"></span></a> / 
        <a href="#en" class="lang">
        <span class="flag-icon flag-icon-gb"></span></a>
      `;
      } else {
        html = `
            <a href="#cs" class="lang"> 
            <span class="flag-icon flag-icon-cz"></span></a> / 
            <a href="#en" class="lang active">
            <span class="flag-icon flag-icon-gb"></span></a>
          `;
      }
      active.innerHTML = html;
    }
    this.setListeners(active);
  }

  setListeners(el) {
    const selectors = el.querySelectorAll(".lang");
    selectors.forEach(selector => clickListener(selector));
    const self = this;

    function clickListener(selector) {
      selector.addEventListener("click", e => {
        e.preventDefault();
        let cls = selector.classList;
        if (cls.contains("active")) return;

        selector.classList.add("active");
        setActivity(selector);

        self.changeLanguageInDOM(selector);
      });
    }

    function setActivity(sel) {
      selectors.forEach(el => {
        if (el === sel) return;
        el.classList.remove("active");
      });
    }
  }

  async translate(lang) {
    Translator.translateFromJSON(lang,"../../assets/data/lang_obj.json", this.langElements, 'data-lang');
    const sourceObject = lang === 'en' ? ['John Doe', 'Subject', 'your@e-mail.com', 'Current Year', 'Text of your message...']  : ['Karel Novák', 'Předmět', 'vas@e-mail.cz', 'Aktuální Rok', 'Text Vaší zprávy...'];
    Translator.translateAttribute(sourceObject, document.querySelectorAll('.form__input'), 'placeholder');

    const send = lang === 'en' ? 'SEND' : 'ODESLAT';
    document.querySelector('.form__button').setAttribute('value', send);

    loadMap();
  }

  async changeLanguageInDOM(selector) {
    const lang = selector.href.substring(selector.href.length - 2, selector.href.length);
    localStorage.setItem('siteLang', lang);

    this.translate(lang);

    document.querySelectorAll('.supplier_added').forEach(el => {
      el.remove();
    });

    new Suppliers().loadData();

  }
}
