import { HttpHandler } from "./httpHandler";
const vanillaTilt = require("vanilla-tilt");
const Http = new HttpHandler();

export class Offer {
  constructor() {
    this.loadSupplier();
    this.supplierContainer = document.querySelector('.supplier__info');
  }

  // Coding itself
  async loadSupplier() {
    const data = await Http.get("../../assets/data/supliers-cs.json");

    let list = document.querySelector(".suppliers-list");
    let html = "";    

    Object.keys(data).forEach(key => {
      // Create html fo ul
      html += `
        <div class="supplier base-tilt-element" data-key="${key}")">
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

    this.addSuppliersAttributes(document.querySelectorAll(".supplier"), data);
  }

  addSuppliersAttributes(suppliers, data) {
    vanillaTilt.init(suppliers, {
      max: 25,
      speed: 10000
    });

    suppliers.forEach(sup => {
      sup.addEventListener('click', ()=>{
        showBottles(data, sup.dataset.key);
      });
    });

    function showBottles(data, key){
      console.log(data[key]);
      
      
    }
  }
}
