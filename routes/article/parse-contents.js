export default (document) => {
    const BuildContents = (dom) => {
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
        return {
            text,
            images,
            links,
        };
    };
    return [...document.querySelectorAll(".editor > *:not(#inline_ad, #SignatureSN)")]
        .map( BuildContents )
        .filter( (item) => Object.keys(item).length > 0 )
    ;
}
