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
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 3000;
app.use((0, cors_1.default)());
app.get("/", (req, res) => {
    res.send("BFF is running");
});
app.get("/search", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query.query;
    console.log("query no bff", query);
    const apiKey = "AIzaSyBRvNywgQb06YovTHU9KHz1HOw7qxHR14Y";
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${apiKey}&type=video&maxResults=12`;
    try {
        const response = yield axios_1.default.get(url);
        res.json(response.data);
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error)) {
            console.error("Error fetching videos:", error.message);
            res.status(500).json({ error: error.message });
        }
        else {
            console.error("An unknown error occurred:", error);
            res.status(500).json({ error: "An unknown error occurred" });
        }
    }
}));
if (require.main === module) {
    app.listen(port, () => {
        console.log(`BFF listening at http://localhost:${port}`);
    });
}
exports.default = app;
