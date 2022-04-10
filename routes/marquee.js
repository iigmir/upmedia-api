import { HomePage } from "../ajax-apis.js";
import { GetSource as get_source, GeLink as get_link } from "../utils.js";
import { parse } from "node-html-parser";

export default async(req, res) => {
    const source = await HomePage();
    const document = parse( source.data );
    const links = [...document.querySelectorAll("#marquee a")].map( get_link );
    const result = {
        meta: get_source(source, req),
        links
    };
    res.jsonp(result);
};
