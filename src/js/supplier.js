const vanillaTilt = require("vanilla-tilt");
import {BotlleContainer} from './bottles';

export class Supplier {
  constructor({ hr, name, img, logo, text, bottles }, key) {
    this.hr = hr;
    this.name = name;
    this.img = img;
    this.logo = logo;
    this.text = text;
    this.bottles = bottles;
    this.key = key;
  }

  get() {
    const supplier = document.createElement("div");
    supplier.className = "supplier base-tilt-element";
    supplier.setAttribute("data-key", this.key);
    supplier.setAttribute("data-scroll-target", ".supplier__info");
    const img = document.createElement("img");
    img.className = "supplier__img";
    img.setAttribute("src", `../../assets/${this.img}`);
    img.setAttribute("alt", `${this.name}`);
    const text = document.createElement("span");
    text.className = "inner-tilt supplier__text";
    text.innerText = this.name;
    const flag = document.createElement("span");
    flag.className = "supplier__flag inner-tilt flag-icon flag-icon-fr";

    supplier.appendChild(img);
    supplier.appendChild(text);
    supplier.appendChild(flag);

    return supplier;
  }

  create() {
    const supplier = this.get();
    vanillaTilt.init(supplier, { max: 25, speed: 10000 });
    supplier.addEventListener("click", clickOn);
    const self = this;

    function clickOn(e) {
      let runBefore = document.querySelector(".supplier__info__logo");
      if (!runBefore) {
        // Create Everything
        self.createStructure();
        document
          .querySelector(".container--offer")
          .append(self.supplierContainer, self.hr, self.bottlesList);
        let info = document.createElement("div");
        info.className = "supplier__info__logo";
        let img = document.createElement("img");
        img.setAttribute("src", `../../assets/${self.logo}`);
        img.setAttribute("alt", `${self.name} logo`);
        info.appendChild(img);
        let text = document.createElement("p");
        text.className = "supplier__info__text";
        text.innerText = self.text;
        self.supplierContainer.append(info, text);
      } else {
        // Set new text
        let text = document.querySelector(".supplier__info__text");
        let img = document
          .querySelector(".supplier__info__logo")
          .querySelector("img");
        img.setAttribute("src", `../../assets/${self.logo}`);
        img.setAttribute("alt", `${self.name} logo`);
        text.innerText = self.text;
      }
      
      // Add bottles
      let list = document.querySelector('.bottles-list');
      new BotlleContainer(list, self.bottles, self.logo);
      removeActiveStatus();
      supplier.classList.add('active');
    }
    

    function removeActiveStatus() {
      const allItems = document.querySelectorAll('.supplier');
      allItems.forEach(i => {
        if (i.classList.contains('active')) i.classList.remove('active');
      });
    }
    
    return supplier;
  }

  createStructure() {
    this.supplierContainer = this.createElement(
      "div",
      "supplier__info row supplier_added"
    );
    this.hr = this.createElement("hr", "line supplier_added");
    this.bottlesList = this.createElement("div", "bottles-list supplier_added");
  }

  createElement(elName, cls = null) {
    const element = document.createElement(elName);
    if (cls !== null) element.className = cls;
    return element;
  }
}
