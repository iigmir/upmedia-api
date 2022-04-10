import SearchNews from "./routes/search.js";
import { HomePage } from "./ajax-apis.js";
import { GetSource as get_source, GeLink as get_link } from "./utils.js";
import express from "express";
import { parse } from "node-html-parser";

const app = express();
const port = 3000;

// Search keyword
app.get("/search/:keyword/:page?", SearchNews);

// hot news, a.k.a. marquee
app.get("/marquee", async(req, res) => {
    const source = await HomePage();
    const document = parse( source.data );
    const links = [...document.querySelectorAll("#marquee a")].map( get_link );
    const result = {
        meta: get_source(source, req),
        links
    };
    res.jsonp(result);
});
app.get("/hot", async(req, res) => {
    res.redirect("/marquee");
});

// Base resource
app.get("/", async(req, res) => {
    const source = await HomePage();
    const document = parse( source.data );
    const link_source = [...document.querySelectorAll("a")].map( get_link );
    const result = {
        meta: get_source(source, req),
        links: {
            // "all": link_source,
            news: link_source.filter( ({ href }) => /news_info.php/.test(href) ),
            categories: link_source.filter( ({ href }) => /news_list.php/.test(href) )
        }
    };
    res.jsonp(result);
});

  
app.listen(port, () => {
    console.log(`Please see: http://127.0.0.1:${port}`)
});
