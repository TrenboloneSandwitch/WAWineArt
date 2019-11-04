import { HttpHandler } from "./httpHandler";
const vanillaTilt = require("vanilla-tilt");
const Http = new HttpHandler();

export class Offer {
  constructor() {
    this.loadSupplier();
  }

  // Coding itself
  async loadSupplier() {
    const data = await Http.get("../../assets/data/supliers-cs.json");

    let list = document.querySelector(".suppliers-list");
    let html = "";
    Object.keys(data).forEach(key => {
      // Create html fo ul
      html += `
        <div class="supplier base-tilt-element">
          <img class="supplier__img" src="../../assets/${data[key].img}">
          <span class="inner-tilt supplier__text">
            ${data[key].name}
          </span>
          <span class="supplier__flag inner-tilt flag-icon flag-icon-fr">
          </span>
        </div>
      `;
    });
    list.innerHTML = html;

    vanillaTilt.init(document.querySelectorAll(".supplier"), {
      max: 25,
      speed: 10000
    });
  }
}
