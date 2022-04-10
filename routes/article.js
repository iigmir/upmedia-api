import { ArticlePage } from "../ajax-apis.js";
import { GetSource, GetLink } from "../utils.js";
import { parse } from "node-html-parser";

export default async(req, res) => {
    const { SerialNo } = req.params;
    const source = await ArticlePage( SerialNo );
    const document = parse( source.data );
    // const link_source = [...document.querySelectorAll("a")].map( get_link );
    const result = {
        meta: GetSource(source, req),
        tags: [...document.querySelectorAll(".tag a")]
            .map( GetLink )
            .map( ({ text, type }) => ({ text, id: type }) ),
        info: {
            title: document.querySelector(".title h1").innerText.trim(),
            author: document.querySelector(".author a").innerText.trim(),
            date: document.querySelector(".author").lastChild.textContent.trim(),
        },
        head_image: {
            src: document.querySelector(".img img").attributes.src,
            alt: document.querySelector(".img img").attributes.alt
        },
        contents: [...document.querySelectorAll(".editor > *:not(#inline_ad)")]
            .map( (dom) => {
                const { textContent, childNodes } = dom;
                const text = textContent.trim();
                // Image module
                const img_sources = [...dom.querySelectorAll("img")];
                const is_image = img_sources.length > 0;
                let images = [];
                if( is_image ) {
                    images = img_sources.map( (dom) => {
                        const { src, alt } = dom.attributes;
                        return { src, alt };
                    });
                }
                // Link module
                const links = childNodes.filter( ({ tagName }) => tagName === "A" ).map( GetLink );
                const passed = /googletag/g.test(textContent) === false;
                // Build result
                const result = { text, images, links, passed, };
                if( text.trim() === "" ) {
                    delete result.text;
                }
                if( images.length < 1 ) {
                    delete result.images;
                }
                if( links.length < 1 ) {
                    delete result.links;
                }
                return result;
            })
            .filter( (item) => item.passed  && Object.keys(item).length > 1 )
            .map( ({ passed, ...rest }) => ({ ...rest }) ),
    };
    res.jsonp(result);
}
