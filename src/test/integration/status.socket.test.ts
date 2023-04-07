import { loadSocketServer } from "@/socket";
import { ISocketDataFormat } from "@/types/socket";
import constants from "@/utils/constants";
import { RESPONSE_STATUS } from "@/utils/response";
import { createServer, IncomingMessage, Server, ServerResponse } from "http";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { io as clientIO, Socket as ClientSocket } from "socket.io-client";
import { statusService } from "@/loaders/service.loader";

describe("Status socket test :)", () => {
  let clientSocket: ClientSocket<DefaultEventsMap, DefaultEventsMap>;
  let server: Server<typeof IncomingMessage, typeof ServerResponse>;

  beforeAll((done) => {
    const port = constants.PORT;
    server = createServer();

    loadSocketServer(server);

    server.listen(port, () => {
      clientSocket = clientIO(`http://localhost:${port}`);

      clientSocket.on("connect", done);
    });
  });

  afterAll(() => {
    clientSocket.close();
    server.close();
  });

  afterEach(() => {
    // 각 테스트마다 사용하는 이벤트 제거하기
    clientSocket.removeListener("error");
  });

  describe("Throw error event to client", () => {
    test("Should client emit with text", (done) => {
      clientSocket.emit("status", "error test");

      clientSocket.on("error", (message) => {
        expect(message).toMatchObject({
          status: RESPONSE_STATUS.FAILURE,
        });

        done();
      });
    });

    test("Should client emit with object, but format not ", (done) => {
      clientSocket.emit("status", {
        data: "error test",
      });

      clientSocket.on("error", (message) => {
        expect(message).toMatchObject({
          status: RESPONSE_STATUS.FAILURE,
        });

        done();
      });
    });
  });

  describe("Success status is right", () => {
    let params: ISocketDataFormat<"good" | "bad">;

    afterEach(() => {
      // 각 테스트마다 사용하는 이벤트 제거하기
      clientSocket.removeListener("status");
    });

    describe("Client confirm status bad", () => {
      beforeAll(() => {
        params = {
          data: "bad",
        };
      });

      test("Should correct result", (done) => {
        clientSocket.emit("status", params);
        jest.spyOn(statusService, "getServerStatus").mockResolvedValue(false);

        clientSocket.on("status", (message) => {
          expect(message).toEqual({
            data: "correct",
            status: RESPONSE_STATUS.SUCCESS,
          });

          done();
        });
      });

      test("Should incorrect result", (done) => {
        clientSocket.emit("status", params);
        jest.spyOn(statusService, "getServerStatus").mockResolvedValue(true);

        clientSocket.on("status", (message) => {
          expect(message).toEqual({
            data: "incorrect",
            status: RESPONSE_STATUS.SUCCESS,
          });

          done();
        });
      });
    });

    describe("Client confirm status good", () => {
      beforeAll(() => {
        params = {
          data: "good",
        };
      });

      test("Should correct result", (done) => {
        clientSocket.emit("status", params);
        jest.spyOn(statusService, "getServerStatus").mockResolvedValue(true);

        clientSocket.on("status", (message) => {
          expect(message).toEqual({
            data: "correct",
            status: RESPONSE_STATUS.SUCCESS,
          });

          done();
        });
      });

      test("Should incorrect result", (done) => {
        clientSocket.emit("status", params);
        jest.spyOn(statusService, "getServerStatus").mockResolvedValue(false);

        clientSocket.on("status", (message) => {
          expect(message).toEqual({
            data: "incorrect",
            status: RESPONSE_STATUS.SUCCESS,
          });

          done();
        });
      });
    });
  });
});
