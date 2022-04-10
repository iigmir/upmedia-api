export const GeLink = (its) => {
    const baseURL = "https://www.upmedia.mg";
    const text = its.text.trim();
    let href = its.attributes.href ?? "";
    if( href.includes( baseURL ) === false ) {
        href = `${baseURL}/${href}`;
    }
    const result = {
        href,
        text
    };
    if( href.includes( "SerialNo" ) ) {
        result.id = href.split("SerialNo=")[1];
    }
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
