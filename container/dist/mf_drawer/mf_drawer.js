"use strict";
class MFDrawer extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({ mode: "closed" });
        this.createHTML();
    }
    createHTML() {
        this.root.innerHTML = `
          <style>@import('./mf/mf-drawer/mf-drawer.css');</style>
          <ul>
              <li>
                  <a href="javascript:void(0)">Vídeos</a>
              </li>
              <li>
                  <a href="javascript:void(0)">Favoritos</a>
              </li>
          </ul>
      `;
    }
}
customElements.define("mf_drawer", MFDrawer);
