import request from "supertest";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import app from "../server";
import { Server } from "http";

const mock = new MockAdapter(axios);
let server: Server;

beforeAll((done) => {
  server = app.listen(3001, () => {
    done();
  });
  jest.spyOn(console, "log").mockImplementation(() => {});
  jest.spyOn(console, "error").mockImplementation(() => {});
});

afterAll((done) => {
  server.close(() => {
    done();
  });
  jest.restoreAllMocks();
});

describe("BFF Server", () => {
  it("should return search results from YouTube API", async () => {
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
      .onGet(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=AIzaSyBRvNywgQb06YovTHU9KHz1HOw7qxHR14Y&type=video&maxResults=12`
      )
      .reply(200, youtubeResponse.data);

    const res = await request(server).get(`/search?query=${query}`);
    expect(res.status).toBe(200);
    expect(res.body).toEqual(youtubeResponse.data);
  });

  it("should handle errors from YouTube API", async () => {
    const query = "errorTest";
    mock
      .onGet(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=AIzaSyBRvNywgQb06YovTHU9KHz1HOw7qxHR14Y&type=video&maxResults=12`
      )
      .reply(500);

    const res = await request(server).get(`/search?query=${query}`);
    expect(res.status).toBe(500);
    expect(res.body.error).toBeDefined();
  });
});
