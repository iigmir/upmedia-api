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
            .map( ({ textContent, childNodes }) => {
                let passed = true;
                const is_image = childNodes[0].tagName === "IMG";
                if( is_image ) {
                    return {
                        image: childNodes[0].attributes.src,
                        passed
                    };
                }
                const has_link = childNodes.filter( ({ tagName }) => tagName === "A" ).length > 0;
                const not_empty_text = textContent.trim() !== "";
                const not_script = /googletag/g.test( textContent ) === false;
                if( not_empty_text && not_script ) {
                    const result = {
                        text: textContent,
                        passed
                    };
                    if( has_link ) {
                        result.links = childNodes.filter( ({ tagName }) => tagName === "A" ).map( GetLink );
                    }
                    return result;
                }
                passed = false;
                return { passed };
            })
            .filter( ({ passed }) => passed )
            .map( ({ passed, ...rest }) => ({ ...rest }) ),
    };
    res.jsonp(result);
}
