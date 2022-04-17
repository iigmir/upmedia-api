import server from "../index.js";
import supertest from "supertest";
import { strictEqual } from "assert";

describe( "GET /article", () => {
    const requestWithSupertest = supertest(server);
    it( "should throw error if no id given", async () => {
        const res = await requestWithSupertest.get("/article");
        strictEqual(res.status, 400);
        strictEqual(res.type, 'application/json');
        strictEqual("error" in res.body, true);
    })
    // afterEach( (done) => {
    //     requestWithSupertest.close(done);
    // })
})