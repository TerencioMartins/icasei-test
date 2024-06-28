class MFVideos extends HTMLElement {
  private root: ShadowRoot;
  private videoSearchInput: HTMLInputElement;
  private searchIcon: SVGElement;

  constructor() {
    super();
    this.root = this.attachShadow({ mode: "closed" });
    this.createHTML();
    this.videoSearchInput = this.root.querySelector(
      "#video-search"
    ) as HTMLInputElement;
    this.searchIcon = this.root.querySelector(
      "#mf_videos__search-icon"
    ) as SVGElement;
    this.addEventListeners();
  }

  private addEventListeners(): void {
    this.videoSearchInput.addEventListener("input", (e: Event) =>
      this.onVideoSearchInputChange(e)
    );
    this.searchIcon.addEventListener("click", () => this.onVideoSearchClick());
  }

  private onVideoSearchInputChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    const isEmpty = target.value.length === 0;
    this.toggleSearchIconDisabledState(isEmpty);
  }

  private onVideoSearchClick(): void {
    const query = this.videoSearchInput.value;
    if (query) {
      this.searchVideos(query);
    }
  }

  private toggleSearchIconDisabledState(disable: boolean): void {
    if (disable) {
      this.searchIcon.classList.add("disabled");
    } else {
      this.searchIcon.classList.remove("disabled");
    }
  }

  private searchVideos(query: string): void {
    // Implementar a lógica de busca de vídeos aqui
    console.log(`Buscando vídeos para a consulta: ${query}`);
  }

  private createHTML(): void {
    this.root.innerHTML = `
      <style>@import url('./container/mf_videos/mf_videos.css');</style>
      <div id="mf_videos__search" class="input-container disabled">
          <input type="text" id="video-search" class="input-box" placeholder="Pesquisar">
          <label for="video-search">Pesquisar vídeos</label>
          <svg id="mf_videos__search-icon" class="disabled" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewbox="0 0 24 24">
              <path d="M14.718,18.155l5.11,5.127c0.954,0.957 2.503,0.957 3.457,0c0.953,-0.957 0.953,-2.511 -0,-3.468l-5.131,-5.147c0.836,-1.441 1.315,-3.115 1.315,-4.901c-0,-5.39 -4.362,-9.766 -9.735,-9.766c-5.372,0 -9.734,4.376 -9.734,9.766c-0,5.39 4.362,9.766 9.734,9.766c1.821,-0 3.526,-0.503 4.984,-1.377Zm-4.984,-15.723c4.035,0 7.31,3.286 7.31,7.334c0,4.048 -3.275,7.334 -7.31,7.334c-4.034,-0 -7.31,-3.286 -7.31,-7.334c0,-4.048 3.276,-7.334 7.31,-7.334Z"/>
          </svg>
      </div>
      <section id="mf_videos__search-results">
      </section>
    `;
  }
}

customElements.define("mf_videos", MFVideos);
