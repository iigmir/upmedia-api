export default (document) => {
    const title = document.querySelector(".title h1");
    if( title == null ) {
        return {
            error: true,
            code: 404,
            message: "Article not found"
        };
    }
    return {
        title: title.textContent.trim() ?? "",
        author: document.querySelector(".author a").textContent?.trim() ?? "",
        date: document.querySelector(".author").lastChild.textContent?.trim() ?? "",
    }
}
