import { MFDrawer } from "../mf_drawer";
describe("MFDrawer Component", () => {
    let drawer;
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
        var _a, _b, _c;
        const favoritesCount = (_c = (_b = (_a = drawer.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector(".mf_drawer_favorites_count")) === null || _b === void 0 ? void 0 : _b.textContent) === null || _c === void 0 ? void 0 : _c.trim();
        expect(favoritesCount).toBe("2");
    });
    test("should have correct links", () => {
        var _a;
        const links = (_a = drawer.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelectorAll(".mf_drawer_button");
        expect(links === null || links === void 0 ? void 0 : links[0].getAttribute("href")).toBe("/mf_videos/mf_videos.html");
        expect(links === null || links === void 0 ? void 0 : links[1].getAttribute("href")).toBe("/mf_videos/mf_favorites.html");
    });
});
