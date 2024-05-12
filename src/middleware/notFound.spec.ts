import request from "supertest";
import { app } from "../index";

describe("Not found middleware", () => {
    it("should return 404", async () => {
        const response = await request(app).get("/randompath");
        expect(response.statusCode).toBe(404);
    });
});
