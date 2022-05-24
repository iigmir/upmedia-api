import server from "../index.js";
import supertest from "supertest";
import { strictEqual } from "assert";

describe( "GET /article", async () => {
    it( "should get 400 if no id given", () => {
        const noid_result = supertest(server).get("/article");
        strictEqual(noid_result.status, 400);
        strictEqual("error" in noid_result.body, true);
    });
    it( "should get 404 if invaild id given", async () => {
        const noid_result = supertest(server).get("/article");
        strictEqual(noid_result.status, 400);
        strictEqual("error" in noid_result.body, true);
    });
    it( "should get success if article given", () => {
        const vaild_result = supertest(server).get("/article/2");
        strictEqual(vaild_result.status, 200);
    });
    it( "should get article URL if article given", (done) => {
        const vaild_result = supertest(server).get("/article/2");
        const res = vaild_result.body;
        strictEqual(res.meta.url, "https://www.upmedia.mg/news_info.php?Type=24&SerialNo=2");
        strictEqual(res.info.title, "颱風尼伯特撲台　高市山區慢性病患者將撤離");
    });
    after((done) => {
        server.close(done);
    })
})