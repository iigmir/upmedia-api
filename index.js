// import axios from "axios";
import { HomePage, SearchPage } from "./ajax-apis.js";
import { GetSource as get_source, GeLink as get_link } from "./utils.js";
import express from "express";
import { parse } from "node-html-parser";

const app = express();
const port = 3000;

// Search keyword
app.get("/search/:keyword/:page?", async (req, res) => {
    const { keyword, page } = req.params;
    const source = await SearchPage(keyword, page);
    const document = parse( source.data );
    // [...document.querySelectorAll("#page a")].filter( ({ href }) => /currentPage/.test(href) )
    const links_source = [...document.querySelectorAll("#news-list dd a")];
    const links = links_source.map( get_link ).filter( ({ href }) => href.includes("news_info.php") );
    const result = {
        meta: get_source(source, req),
        keyword,
        links
    };
    if( links_source.length < 1 ) {
        res.status(404);
        result.error = "No such info";
    }
    // res.header("X-Example", "Hello World!");
    res.jsonp(result);
});

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
