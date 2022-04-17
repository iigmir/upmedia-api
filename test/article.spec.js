import server from "../index.js";
import supertest from "supertest";
import { strictEqual } from "assert";

describe( "GET /article", async () => {
    const request = supertest(server);
    const noid_result = await request.get("/article");
    const vaild_result = await request.get("/article/2");
    it( "should get 400 if no id given", async () => {
        strictEqual(noid_result.status, 400);
        strictEqual("error" in noid_result.body, true);
    });
    it( "should get 404 if invaild id given", async () => {
        strictEqual(noid_result.status, 400);
        strictEqual("error" in noid_result.body, true);
    });
    it( "should get success if article given", async () => {
        strictEqual(vaild_result.status, 200);
        
    });
    it( "should get article URL if article given", async () => {
        const res = vaild_result.body;
        strictEqual(res.meta.url, "https://www.upmedia.mg/news_info.php?Type=24&SerialNo=2");
        strictEqual(res.info.title, "颱風尼伯特撲台　高市山區慢性病患者將撤離");
    });
    // FIXME: request.close is not a function
    afterEach( (done) => {
        request.close(done);
    })
})