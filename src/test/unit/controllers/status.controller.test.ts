import statusController from "@/controllers/status.controller";
import { statusService } from "@/loaders/service.loader";
import { TStatusEventData } from "@/types/socket";
import { Socket } from "socket.io";

const socket = {
  emit: jest.fn(),
} as unknown as Socket;

describe("Status controller test :)", () => {
  let isGood: TStatusEventData;

  beforeEach(() => {
    isGood = "good";
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Server status is bad", () => {
    beforeAll(() => {
      jest.spyOn(statusService, "getServerStatus").mockReturnValue(false);
    });

    test("Should emit incorrect with parameter is good", () => {
      statusController(socket, isGood);

      expect(socket.emit).toBeCalledWith(
        "status",
        expect.objectContaining({
          data: "incorrect",
        }),
      );
    });

    test("Should emit correct with parameter is bad", () => {
      isGood = "bad";
      statusController(socket, isGood);

      expect(socket.emit).toBeCalledWith(
        "status",
        expect.objectContaining({
          data: "correct",
        }),
      );
    });
  });

  describe("Server status is good", () => {
    beforeAll(() => {
      jest.spyOn(statusService, "getServerStatus").mockReturnValue(true);
    });

    test("Should emit correct with parameter is good", () => {
      statusController(socket, isGood);

      expect(socket.emit).toBeCalledWith(
        "status",
        expect.objectContaining({
          data: "correct",
        }),
      );
    });

    test("Should emit incorrect with parameter is bad", () => {
      isGood = "bad";
      statusController(socket, isGood);

      expect(socket.emit).toBeCalledWith(
        "status",
        expect.objectContaining({
          data: "incorrect",
        }),
      );
    });
  });
});
