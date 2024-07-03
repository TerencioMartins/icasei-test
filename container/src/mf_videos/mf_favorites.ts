class MFFavorites extends HTMLElement {
  private root: ShadowRoot;
  private videoList: HTMLElement;
  private favorites: any[] = [];

  constructor() {
    super();
    this.root = this.attachShadow({ mode: "closed" });
    this.createHTML();
    this.videoList = this.root.getElementById("mf_videos_list") as HTMLElement;
    this.favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    this.displayVideos(this.favorites);
  }

  private displayVideos(videos: any[]): void {
    this.videoList.innerHTML = "";

    this.favorites.forEach((video) => {
      const videoItem = document.createElement("div");
      videoItem.className = "videoItem";

      const videoThumbnail = document.createElement("img");
      videoThumbnail.src = video.snippet.thumbnails.high.url;

      const favoriteIcon = document.createElement("span");
      favoriteIcon.className = "favorite";
      favoriteIcon.textContent = "☆";
      favoriteIcon.addEventListener("click", (event) => {
        event.stopPropagation();
        this.toggleFavorite(video, videoItem);
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

  private toggleFavorite(video: any, videoItem: HTMLElement): void {
    videoItem.remove();
    const index = this.favorites.findIndex(
      (fav: any) => fav.id.videoId === video.id.videoId
    );

    if (index !== -1) {
      this.favorites.splice(index, 1);
    } else {
      this.favorites.push(video);
    }

    localStorage.setItem("favorites", JSON.stringify(this.favorites));
    localStorage.setItem("favoriteCount", this.favorites.length.toString());
  }

  private createHTML(): void {
    this.root.innerHTML = `
      <style>@import url('/mf_videos/mf_videos.css');</style>
      <div class="mf_videos_container">
        <div id="mf_videos_list">
        </div>
      </div>
    `;
  }
}
customElements.define("mf-favorites", MFFavorites);
