import server from "../index.js";
import supertest from "supertest";
import { strictEqual } from "assert";

describe( "GET /article", () => {
    const request = supertest(server);
    it( "should throw error if no id given", async () => {
        const res = await request.get("/article");
        strictEqual(res.status, 400);
        strictEqual(res.type, 'application/json');
        strictEqual("error" in res.body, true);
    })
    // FIXME: request.close is not a function
    // afterEach( (done) => {
    //     request.close(done);
    // })
})