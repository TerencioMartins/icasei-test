class MFDrawer extends HTMLElement {
  private root: ShadowRoot;
  private favorites: any[] = [];

  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });
    this.favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    this.createHTML();
  }

  private createHTML(): void {
    this.root.innerHTML = `
          <style>@import url('/mf_drawer/mf_drawer.css');</style>
            <div class="mf_drawer_navbar">
                      <a class="mf_drawer_button" href="/mf_videos/mf_videos.html">
                      Vídeos
                      </a>
                      <a class="mf_drawer_button"  href="/mf_videos/mf_favorites.html">
                      Favoritos 
                      <span class="mf_drawer_favorites_count">
                      ${this.favorites.length}
                      </span>
                      </a>
            </div>
      `;
  }
}

customElements.define("mf-drawer", MFDrawer);
export { MFDrawer };
