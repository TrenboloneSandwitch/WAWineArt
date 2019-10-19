import { log } from "util";
import {scrollMaster} from "./scrollMaster";

class Navbar {
  constructor({ navbar, brand, content, button }, logo) {
    this.navbar = navbar;
    this.brand = brand;
    this.content = content;
    this.button = button;
    this.svg = this.button.querySelector(".navbar__ham");
    this.logo = logo;
  }

  manageListeners() {
    // Button Click
    this.button.addEventListener("click", e => {
      this.content.classList.toggle("navbar--collapsed");
      this.svg.classList.toggle("line--active");
      this.logo.classList.toggle("logo--hidden");
    });

    window.onscroll = () => this.changeBackroundColor();
    
    window.onresize = () => this.changeBrandText();
  }
  //CHANGE BRAND TEXT DEPENDS ON WINDOW WIDTH
  changeBrandText() {
    let brandText;
    if (window.innerWidth > 310) {
      brandText = "Wine & Art";
    } else {
      brandText = window.innerWidth > 215 ? "W&A" : "";
    }
    this.brand.innerText = brandText;
  }

  changeBackroundColor() {
    if( document.body.scrollTop > 130 || document.documentElement.scrollTop > 130 ) {
      this.navbar.classList.add("navbar--bgColorVisible")
    } else {
      this.navbar.classList.remove("navbar--bgColorVisible");
    }
  }
}
/*   APP JS   */

const smoothScroll = new scrollMaster('.smoothScroll', 1000);


const navbarElement = {
  navbar: document.querySelector(".navbar"),
  brand: document.querySelector(".navbar__brand"),
  content: document.querySelector(".navbar__content"),
  button: document.querySelector(".navbar__button")
};
const logo = document.querySelector(".logo");

const a = new Navbar(navbarElement, logo);
a.manageListeners();


document.addEventListener('DOMContentLoaded', () =>{
  smoothScroll.init();
  a.changeBackroundColor();
});
