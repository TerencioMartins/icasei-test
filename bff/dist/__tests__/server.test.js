"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const axios_1 = __importDefault(require("axios"));
const axios_mock_adapter_1 = __importDefault(require("axios-mock-adapter"));
const server_1 = __importDefault(require("../server"));
const mock = new axios_mock_adapter_1.default(axios_1.default);
let server;
beforeAll((done) => {
    server = server_1.default.listen(3001, () => {
        done();
    });
    jest.spyOn(console, "log").mockImplementation(() => { });
    jest.spyOn(console, "error").mockImplementation(() => { });
});
afterAll((done) => {
    server.close(() => {
        done();
    });
    jest.restoreAllMocks();
});
describe("BFF Server", () => {
    it("should return search results from YouTube API", () => __awaiter(void 0, void 0, void 0, function* () {
        const query = "test";
        const youtubeResponse = {
            data: {
                items: [{ id: { videoId: "testId" }, snippet: { title: "testTitle" } }],
            },
            status: 200,
            statusText: "OK",
            headers: {},
            config: {
                headers: {},
                method: "get",
                url: "",
            },
        };
        mock
            .onGet(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=AIzaSyBRvNywgQb06YovTHU9KHz1HOw7qxHR14Y&type=video&maxResults=12`)
            .reply(200, youtubeResponse.data);
        const res = yield (0, supertest_1.default)(server).get(`/search?query=${query}`);
        expect(res.status).toBe(200);
        expect(res.body).toEqual(youtubeResponse.data);
    }));
    it("should handle errors from YouTube API", () => __awaiter(void 0, void 0, void 0, function* () {
        const query = "errorTest";
        mock
            .onGet(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=AIzaSyBRvNywgQb06YovTHU9KHz1HOw7qxHR14Y&type=video&maxResults=12`)
            .reply(500);
        const res = yield (0, supertest_1.default)(server).get(`/search?query=${query}`);
        expect(res.status).toBe(500);
        expect(res.body.error).toBeDefined();
    }));
});
