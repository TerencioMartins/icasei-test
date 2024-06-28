import express, { Request, Response } from "express";
import axios, { AxiosResponse } from "axios";
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("BFF is running");
});

app.get("/search", async (req: Request, res: Response) => {
  const query = req.query.query as string;
  console.log("query no bff", query);

  const apiKey = "AIzaSyBRvNywgQb06YovTHU9KHz1HOw7qxHR14Y";
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${apiKey}&type=video&maxResults=12`;

  try {
    const response: AxiosResponse = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error fetching videos:", error.message);
      res.status(500).json({ error: error.message });
    } else {
      console.error("An unknown error occurred:", error);
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
});

app.listen(port, () => {
  console.log(`BFF listening at http://localhost:${port}`);
});
