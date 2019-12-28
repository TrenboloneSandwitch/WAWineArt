import { Bottle } from "./bottle";

export class BotlleContainer{
  constructor(container, bottles, supplierLogo) {
    this.container = container;
    this.bottles = bottles;
    this.supplierLogo = supplierLogo;
    this.fillContainer();
  }

  clearContainer() {
    this.container.innerHTML = '';
  }

  fillContainer(){
    this.clearContainer();
    this.bottles.forEach( bottle => {    
      const _bottle = new Bottle(bottle, this.supplierLogo).get();
      this.container.appendChild(_bottle);
    });
  }
}