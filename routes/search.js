import { SearchPage } from "../ajax-apis.js";
import { GetSource, GetLink } from "../utils.js";
import { parse } from "node-html-parser";

export default async (req, res) => {
    const { keyword, page } = req.params;
    const source = await SearchPage(keyword, page);
    const document = parse(source.data);
    // [...document.querySelectorAll("#page a")].filter( ({ href }) => /currentPage/.test(href) )
    const links_source = [...document.querySelectorAll("#news-list dd a")];
    const links = links_source.map(GetLink).filter(({ href }) => href.includes("news_info.php"));
    const result = {
        meta: GetSource(source, req),
        keyword,
        links
    };
    if (links_source.length < 1) {
        res.status(404);
        result.error = "No such info";
    }
    // res.header("X-Example", "Hello World!");
    res.jsonp(result);
};
