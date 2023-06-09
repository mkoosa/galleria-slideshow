import storage from "../tools/Storage.js";
import { stopMusic } from "../tools/howler.js";
class Header extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const template = document.createElement("template");
    shadowRoot.appendChild(template.content.cloneNode(true));
    this.setAttribute("class", "header d-row");
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="styles/style.css">
            <img class="header__logo" src="assets/shared/logo.svg" alt="logo">
            <slideshow-comp></slideshow-comp>
            `;

    const galleria = this.shadowRoot.querySelector(".header__logo");
    galleria.addEventListener("click", () => this.backToGalleria(galleria));
  }

  backToGalleria(galleria) {
    stopMusic();
    storage.clearStorage();
    document.querySelector("cart-comp")
    ? this.displayGalleria(galleria)
    : this.noDisplayGalleria(galleria);
  }
  
  displayGalleria(galleria) {
    this.removeComponents();
    const main = document.querySelector("main");
    const slidesComp = document.createElement("slides-comp");
    main.appendChild(slidesComp);
    this.changeStye(galleria)
  }

  changeStye(element) {
    element.style.opacity = .2;
    element.style.cursor = 'initial';
  }

  noDisplayGalleria(galleria) {
    galleria.removeEventListener("click", () => this.backToGalleria(galleria));
  }

  removeComponents() {
    document.querySelector("footer-comp").remove();
    document.querySelector("cart-comp").remove();
  }
}

window.customElements.define("header-comp", Header);
