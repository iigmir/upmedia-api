import { ArticlePage } from "../../ajax-apis.js";
import { GetSource, GetLink } from "../../utils.js";
import { parse } from "node-html-parser";
import ParseContent from "./parse-contents.js";
import ParseNavigation from "./parse-navigation.js";

export default async(req, res) => {
    const { SerialNo } = req.params;
    const source = await ArticlePage( SerialNo );
    const document = parse( source.data );
    const result = {
        meta: GetSource(source, req),
        info: {
            title: document.querySelector(".title h1").textContent.trim(),
            author: document.querySelector(".author a").textContent.trim(),
            date: document.querySelector(".author").lastChild.textContent.trim(),
        },
        head_image: {
            src: document.querySelector(".img img").attributes.src,
            alt: document.querySelector(".img img").attributes.alt
        },
        contents: ParseContent( document ),
        see_also: [...document.querySelectorAll(".related a")].map(GetLink),
        tags: [...document.querySelectorAll(".tag a")].map(GetLink).map(({ text, type }) => ({ text, id: type })),
        keywords: [...document.querySelectorAll(".label a")].map(GetLink).map(({ text }) => text),
        navigation: ParseNavigation( document )
    };
    res.jsonp(result);
}
