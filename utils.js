export const GetLink = (its) => {
    const baseURL = "https://www.upmedia.mg";
    const text = its.text.trim();
    let href = its.attributes.href ?? "";
    if( href.includes( baseURL ) === false ) {
        href = `${baseURL}/${href}`;
    }
    const url = new URL(href);
    const params = {
        id: url.searchParams.get("SerialNo"),
        type: url.searchParams.get("Type")
    }
    const result = { href, text, ...params };
    return result;
};

export const GetSource = (source, req) => {
    const result = {
        url: `https://${source.request.host}${source.request.path}`
    };
    if( "GetHtml" in req.query ) {
        result.html = source.data;
    }
    return result;
};
