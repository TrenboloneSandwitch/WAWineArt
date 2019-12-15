import { LanguageSelector } from './languageSelector';
import { log } from 'util';

export class Navbar {
  constructor({
    navbar,
    brand,
    content,
    button,
    logo
  }) {
    this.navbar = navbar;
    this.brand = brand;
    this.content = content;
    this.button = button;
    this.svg = this.button.querySelector(".navbar__ham");
    this.logo = logo;


    this.navbarButtonEmit();
    this.clickOption();
    this.languageElement = new LanguageSelector(915);
    this.languageElement.placeLanguageSelector();
  }
  toggleStates() {
    this.content.classList.toggle("navbar--collapsed");
    this.svg.classList.toggle("line--active");
    this.logo.classList.toggle("logo--hidden");
  }

  clickOption() {
    const links = this.content.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', () => {
        if(!this.content.classList.contains('navbar--collapsed')) this.toggleStates();
      });
    });
    
  }


  navbarButtonEmit() {
    // Navbar Menu Button Click
    this.button.addEventListener("click", e => {
      // Navbar Handling
      this.toggleStates();
    });    
  }

  //CHANGE BRAND TEXT DEPENDS ON WINDOW WIDTH
  changeNavbarBasedOnWindowSize() {
    let brandText;
    if (window.innerWidth > 310) {
      brandText = "Wine & Art";
    } else {
      brandText = window.innerWidth > 215 ? "W&A" : "";
    }
    this.brand.innerText = brandText;

    this.languageElement.placeLanguageSelector();
  }

  changeBackroundColor() {
    if (
      document.body.scrollTop > 130 ||
      document.documentElement.scrollTop > 130
    ) {
      this.navbar.classList.add("navbar--bgColorVisible");
    } else {
      this.navbar.classList.remove("navbar--bgColorVisible");
    }
  }
}