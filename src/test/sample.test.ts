import server from "@/app";
import HTTP_STATUS_CODE from "@utils/httpStatusCode";
import request from "supertest";

describe("GET /api/sample", () => {
  test("정상 case :)", (done) => {
    request(server)
      .get("/api/sample")
      .query({
        num: 20,
      })
      .expect(HTTP_STATUS_CODE.OK, done);
  });

  test("필수 파라미터 없는 case :(", (done) => {
    request(server).get("/api/sample").expect(HTTP_STATUS_CODE.INVALID_VALUE, done);
  });

  test("필수 파라미터의 타입이 잘못된 case :(", (done) => {
    request(server)
      .get("/api/sample")
      .query({
        num: true,
      })
      .expect(HTTP_STATUS_CODE.INVALID_VALUE, done);
  });
});
