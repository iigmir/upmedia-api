import { ArticlePage } from "../ajax-apis.js";
import { GetSource } from "../utils.js";
import { parse } from "node-html-parser";

export default async(req, res) => {
    const source = await ArticlePage();
    const document = parse( source.data );
    // const link_source = [...document.querySelectorAll("a")].map( get_link );
    const result = {
        meta: GetSource(source, req),
        title: document.querySelector(".title h1").innerText.trim(),
    };
    res.jsonp(result);
}
