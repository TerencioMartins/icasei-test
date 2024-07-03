const express = require("express");
const app = express();

const PORT = "3001";

// app.use(express.static(__dirname + "/src"));

app.get("/", (_, res) => {
  res.sendFile(__dirname + "/dist/mf_videos.html");
});

app.get("/videos", (_, res) => {
  res.sendFile(__dirname + "/src/mf_videos.html");
});

app.get("/favoritos", (_, res) => {
  res.sendFile(__dirname + "/src/mf_favorites.html");
});

app.listen(PORT);
console.log(`Serving at localhost:${PORT}`);
