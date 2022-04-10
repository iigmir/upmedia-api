// Routes
import SearchNews from "./routes/search.js";
import HotNews from "./routes/marquee.js";
import MainNews from "./routes/main.js";
// Modules
import express from "express";

const app = express();
const port = 3000;

// 

// Search keyword
app.get("/search/:keyword/:page?", SearchNews);

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
