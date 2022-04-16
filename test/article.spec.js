import server from "../index.js";
import supertest from "supertest";
import { strictEqual } from "assert";
const requestWithSupertest = supertest(server);

describe( "/article", () => {
    it( "should throw error if no id given", async () => {
        const res = await requestWithSupertest.get("/article");
        strictEqual(res.status, 200);
        strictEqual(res.type, 'json');
        strictEqual(res.body, "error");
    })
})