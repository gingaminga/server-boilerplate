import request from "supertest";
import server from "@/app";

describe("GET /api/status", () => {
  it("status to be 200 and recieve OK message :)", async () => {
    const res = await request(server).get("/api/status");

    expect(res.status).toBe(200);
  });
});
