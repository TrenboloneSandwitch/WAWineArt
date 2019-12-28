import { HttpHandler } from "./httpHandler";
import { Supplier } from "./supplier";


export class Suppliers{
  constructor(data) {
    this.data = data;
    this.suppliersList = document.querySelector('.suppliers-list');
    this.mainContainer = document.querySelector('.container--offer');
    this.appendToList();
  }

  createStructure() {
    this.supplierContainer = this.createElement('div', 'supplier__info row supplier_added');
    this.hr = this.createElement('hr', 'line supplier_added');
    this.bottlesList = this.createElement('div', 'bottles-list supplier_added');
  }

  createElement(elName, cls = null) {
    const element = document.createElement(elName);
    if (cls !== null) element.className = cls;
    return element;
  }

  

  appendToList() {
    this.createStructure();
    //this.mainContainer.append(this.supplierContainer);
  }

  async loadData() {
    this.suppliersList.innerHTML ='';


    const Http = new HttpHandler();
    let lang = localStorage.getItem('siteLang') ? localStorage.getItem('siteLang') : 'cs';
    const suppliers = await Http.get(`../../assets/data/supliers-${lang}.json`);
    Object.keys(suppliers).forEach(key => {     
      const supplier = new Supplier(suppliers[key], key).create();

      this.suppliersList.append(supplier);
    });
    
    
  }

}