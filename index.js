// Routes
import SearchNews from "./routes/search.js";
import HotNews from "./routes/marquee.js";
import MainNews from "./routes/main.js";
import NewsArticle from "./routes/article.js";
import { NoParamGiven } from "./routes/errors.js";
// Modules
import express from "express";

const app = express();
const port = 3000;

// article keyword
app.get("/article/:SerialNo", NewsArticle);
app.get("/article", NoParamGiven);

// Search keyword
app.get("/search/:keyword/:page?", SearchNews);
app.get("/search", NoParamGiven);

// Hot news, a.k.a. marquee
app.get("/hot", HotNews);
app.get("/marquee", async(req, res) => {
    res.redirect("/hot");
});

// Base resource
app.get("/", MainNews);

app.listen(port, () => {
    console.log(`Please see: http://127.0.0.1:${port}`)
});
