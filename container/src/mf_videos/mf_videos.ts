class MFVideos extends HTMLElement {
  private root: ShadowRoot;
  private videoSearchInput: HTMLInputElement;
  private searchIcon: SVGElement;
  private videoList: HTMLElement;

  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });
    this.createHTML();
    this.videoSearchInput = this.root.querySelector(
      "#video-search"
    ) as HTMLInputElement;
    this.searchIcon = this.root.querySelector(
      "#mf_videos_search_input-icon"
    ) as SVGElement;
    this.videoList = this.root.getElementById("mf_videos_list") as HTMLElement;
    this.addEventListeners();
  }

  private addEventListeners(): void {
    this.videoSearchInput.addEventListener("input", (e: Event) => {
      const target = e.target as HTMLInputElement;
    });
    this.searchIcon.addEventListener("click", () => this.onVideoSearchClick());
    this.videoSearchInput.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        this.onVideoSearchClick();
      }
    });
  }

  private onVideoSearchClick(): void {
    const query = this.videoSearchInput.value;
    if (query) {
      this.searchVideos(query);
    }
  }

  private searchVideos(query: string): void {
    fetch(`http://localhost:3000/search?query=${query}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        this.displayVideos(data.items);
        console.log(`data`, data);
      })
      .catch((error) => {
        console.error("Error fetching videos:", error);
      });
  }

  private displayVideos(videos: any[]): void {
    this.videoList.innerHTML = "";

    videos.forEach((video) => {
      const videoItem = document.createElement("div");
      videoItem.className = "videoItem";

      const videoThumbnail = document.createElement("img");
      videoThumbnail.src = video.snippet.thumbnails.high.url;

      const favoriteIcon = document.createElement("span");
      favoriteIcon.className = "favorite";
      favoriteIcon.textContent = "☆";
      favoriteIcon.addEventListener("click", (event) => {
        event.stopPropagation();
        this.toggleFavorite(video);
        favoriteIcon.textContent = favoriteIcon.textContent === "☆" ? "★" : "☆";
      });

      videoItem.appendChild(videoThumbnail);
      videoItem.appendChild(favoriteIcon);
      this.videoList.appendChild(videoItem);
      videoItem.addEventListener("click", () => {
        this.playVideo(video.id.videoId, videoItem);
      });
    });
  }

  private playVideo(videoId: string, videoItem: HTMLElement): void {
    videoItem.innerHTML = "";

    const videoPlayer = document.createElement("iframe");
    videoPlayer.src = `https://www.youtube.com/embed/${videoId}`;
    videoPlayer.width = "368";
    videoPlayer.height = "207";
    videoPlayer.allowFullscreen = true;
    videoItem.appendChild(videoPlayer);
  }

  private toggleFavorite(video: any): void {
    let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    const index = favorites.findIndex(
      (fav: any) => fav.id.videoId === video.id.videoId
    );

    if (index !== -1) {
      favorites.splice(index, 1);
    } else {
      favorites.push(video);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
    localStorage.setItem("favoriteCount", favorites.length.toString());
  }

  private createHTML(): void {
    this.root.innerHTML = `
      <style>@import url('/mf_videos/mf_videos.css');</style>
      <div class="mf_videos_container">
        <div id="mf_videos_search_input" class="input-container">
            <input type="text" id="video-search" class="input-box" placeholder="Pesquisar">
            <svg id="mf_videos_search_input-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewbox="0 0 24 24">
                <path d="M14.718,18.155l5.11,5.127c0.954,0.957 2.503,0.957 3.457,0c0.953,-0.957 0.953,-2.511 -0,-3.468l-5.131,-5.147c0.836,-1.441 1.315,-3.115 1.315,-4.901c-0,-5.39 -4.362,-9.766 -9.735,-9.766c-5.372,0 -9.734,4.376 -9.734,9.766c-0,5.39 4.362,9.766 9.734,9.766c1.821,-0 3.526,-0.503 4.984,-1.377Zm-4.984,-15.723c4.035,0 7.31,3.286 7.31,7.334c0,4.048 -3.275,7.334 -7.31,7.334c-4.034,-0 -7.31,-3.286 -7.31,-7.334c0,-4.048 3.276,-7.334 7.31,-7.334Z"/>
            </svg>
        </div>
        <div id="mf_videos_list">
        </div>
      </div>
    `;
  }
}

if (!customElements.get("mf-videos")) {
  customElements.define("mf-videos", MFVideos);
}
