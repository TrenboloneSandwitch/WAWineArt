import { HttpHandler } from "./httpHandler";
const vanillaTilt = require("vanilla-tilt");
const Http = new HttpHandler();

export class Offer {
  constructor() {
    this.createStructure(); 
    this.loadSuppliers();  

    this.mainContainer = document.querySelector('.container--offer');
    this.suppliersList = document.querySelector('.suppliers-list');
  }

  createStructure() {
    this.supplierContainer = this.createElement('div', 'supplier__info row');
    this.hr = this.createElement('hr', 'line');
    this.bottlesList = this.createElement('div', 'bottles-list');
  }

  createElement(elName, cls = null) {
    const element = document.createElement(elName);
    if (cls !== null) element.className = cls;
    return element;
  }

  async loadSuppliers() {
    const data = await Http.get("../../assets/data/supliers-cs.json");
    let html = "";    
    Object.keys(data).forEach(key => {
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
    this.suppliersList.innerHTML = html;
    this.addSuppliersAttributes(document.querySelectorAll(".supplier"), data);
  }

  addSuppliersAttributes(suppliers, data) {
    
    vanillaTilt.init(suppliers, {
      max: 25,
      speed: 10000
    });

    suppliers.forEach(sup => {
      sup.addEventListener('click', ()=>{
        this.mainContainer.append(this.supplierContainer, this.hr,this.bottlesList);
        this.insertAdditionallInfos(data[sup.dataset.key]);
      });
    });
  }

  insertAdditionallInfos(data){
    const supplier = data;
    this.supplierContainer.innerHTML = `
      <div class="supplier__info__logo">
        <img src="../../assets/${supplier.logo}" alt="${supplier.name} logo">
      </div>
      <div class="supplier__info__text"> 
        ${supplier.text}
      </div> `;  
      this.apendWineList(supplier.bottles, supplier.logo);
  }

  apendWineList(bottles, logo) {
    let html = '';
    bottles.forEach(b => {
      let species = '';
      let description = '';
      b.species.forEach(sp => {
        species += `<li>${sp}</li>`;
      });
      b.description.forEach(d => {
        description += `<li>- ${d}</li>`;
      });
      html +=  `
        <div class="bottle column">
          <div class="bottle__head">
            <img class="bottle__bg-image" src="../../assets/${logo}">
            <img class="bottle__image" src="../../assets/${b.img}">
          </div>
          <div class="bottle__body">
            <h3 class="bottle__heading">${b.name}</h3>
            <div class="bottle__basic-info column">
              <div class="bottle__species row">
                <div class="bold">odrůda: &nbsp;</div>
                <ul class="bottle__species-list">
                  ${species}
                </ul>
              </div>
              <div class="bottle__dosage">
                <span class="bold">dosage:&nbsp;</span>
                <span>${b.dosage} g/l</span>
              </div>
            </div>
            <ul class="bottle__more-info">
              ${description}
            </ul>
          </div>
        </div>
      `;
    });
    this.bottlesList.innerHTML = html; 
  }
}
