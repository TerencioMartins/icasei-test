class MFDrawer extends HTMLElement {
  private root: ShadowRoot;

  constructor() {
    super();
    this.root = this.attachShadow({ mode: "closed" });
    this.createHTML();
  }

  private createHTML(): void {
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
