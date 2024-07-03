import { MFVideos } from "../mf_videos";

describe("MFVideos", () => {
  let mfVideos = MFVideos;

  beforeEach(() => {
    document.body.innerHTML = '<mf-videos id="mf_videos"></mf-videos>';
    mfVideos = document.querySelector("mf-videos");
  });

  test("should be defined", () => {
    expect(mfVideos).toBeDefined();
  });

  test("should display videos correctly", () => {
    const mockVideos = [
      { id: { videoId: "abc123" }, snippet: { title: "Test Video" } },
    ];
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ items: mockVideos }),
      })
    );
    mfVideos.searchVideos("test");
    setTimeout(() => {
      const videoItems = document.querySelectorAll(".videoItem");
      expect(videoItems.length).toBe(mockVideos.length);
    }, 0);
  });

  // Teste para verificar a funcionalidade de favoritos
  test("should toggle favorites correctly", () => {
    const video = { id: { videoId: "xyz789" } };
    mfVideos.toggleFavorite(video);

    // Verifica se o vídeo foi adicionado aos favoritos
    let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    expect(favorites).toContainEqual(video);

    // Remove o vídeo dos favoritos
    mfVideos.toggleFavorite(video);
    favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    expect(favorites).not.toContainEqual(video);
  });
});
