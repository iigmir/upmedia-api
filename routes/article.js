export default async(req, res) => {
    // const source = await HomePage();
    // const document = parse( source.data );
    // const link_source = [...document.querySelectorAll("a")].map( get_link );
    // const result = {
    //     meta: get_source(source, req),
    //     links: {
    //         // "all": link_source,
    //         news: link_source.filter( ({ href }) => /news_info.php/.test(href) ),
    //         categories: link_source.filter( ({ href }) => /news_list.php/.test(href) )
    //     }
    // };
    res.jsonp({ result: "Hello World" });
}
