import server from "@/app";
import request from "supertest";

describe("GET /api/status", () => {
  it("status to be 200 and recieve OK message :)", async () => {
    const res = await request(server).get("/api/status");

    expect(res.status).toBe(200);
  });
});
