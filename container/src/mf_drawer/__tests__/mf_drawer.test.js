import { MFDrawer } from "../mf_drawer";

describe("MFDrawer Component", () => {
  let drawer = MFDrawer;
  beforeEach(() => {
    localStorage.setItem("favorites", JSON.stringify(["video1", "video2"]));
    drawer = new MFDrawer();
  });

  afterEach(() => {
    localStorage.clear();
  });

  test("should create the shadow DOM", () => {
    expect(drawer.shadowRoot).toBeTruthy();
  });

  test("should display the correct number of favorites", () => {
    const favoritesCount = drawer.shadowRoot
      ?.querySelector(".mf_drawer_favorites_count")
      ?.textContent?.trim();
    expect(favoritesCount).toBe("2");
  });

  test("should have correct links", () => {
    const links = drawer.shadowRoot?.querySelectorAll(".mf_drawer_button");
    expect(links?.[0].getAttribute("href")).toBe("/mf_videos/mf_videos.html");
    expect(links?.[1].getAttribute("href")).toBe(
      "/mf_videos/mf_favorites.html"
    );
  });
});
