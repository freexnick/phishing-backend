import request from "supertest";
import { app } from "../index";

describe("Healthcheck", () => {
    it("should return 200 from /healthcheck", async () => {
        const response = await request(app).get("/healthcheck");
        expect(response.statusCode).toBe(200);
    });
});
