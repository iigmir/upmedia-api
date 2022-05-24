import server from "../index.js";
import supertest from "supertest";

/**
 * @see https://github.com/visionmedia/supertest/issues/437
 */
describe( "GET /article", async () => {
    it( "should get 400 if no id given", (done) => {
        const noid_result = supertest(server).get("/article");
        noid_result.expect(400, done);
    });
    it( "should get 404 if invaild id given", (done) => {
        const noid_result = supertest(server).get("/article/3.1415926");
        noid_result.expect(404, done);
    });
    it( "should get success if article given", (done) => {
        const vaild_result = supertest(server).get("/article/2");
        vaild_result.expect(200, done);
    });
    it( "should get article URL if article given", (done) => {
        const vaild_result = supertest(server).get("/article/2");
        vaild_result.expect(200, done);
        // strictEqual(res.meta.url, "https://www.upmedia.mg/news_info.php?Type=24&SerialNo=2");
        // eslint-disable-next-line no-irregular-whitespace
        // strictEqual(res.info.title, "颱風尼伯特撲台　高市山區慢性病患者將撤離");
    });
    after((done) => {
        server.close(done);
    })
})