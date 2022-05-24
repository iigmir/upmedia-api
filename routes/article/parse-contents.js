export default (document) => {
    const BuildContents = (dom) => {
        // const { textContent } = dom;
        const text = dom.textContent.trim();
        // Image module
        const images = [...dom.querySelectorAll("img")].map((dom) => {
            const { src, alt } = dom.attributes;
            return { src, alt };
        });
        // Link module
        const links = [...dom.querySelectorAll("a")].map((its) => ({
            href: its.attributes.href,
            text: its.textContent
        }));
        // Build result
        const result = {
            text,
            images,
            links,
        };
        if (text === "") {
            delete result.text;
        }
        if (images.length < 1) {
            delete result.images;
        }
        if (links.length < 1) {
            delete result.links;
        }
        return result;
    };
    return [...document.querySelectorAll(".editor > *:not(#inline_ad, #SignatureSN)")]
        .map( BuildContents )
        .filter( (item) => Object.keys(item).length > 0 )
    ;
}
