import { redisClient } from "@loaders/database.loader";
import { statusService } from "@loaders/service.loader";

describe("Status service test :)", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Function getServerStatus()", () => {
    test("Should throw error when redis connection is bad", async () => {
      redisClient.get = jest.fn().mockRejectedValue("Error test");

      expect(statusService.getServerStatus()).rejects.toEqual("Error test");
    });

    test("Should return false when server status is bad", async () => {
      redisClient.get = jest.fn().mockResolvedValue(false);

      const serverStatus = await statusService.getServerStatus();
      expect(serverStatus).toEqual(false);
    });

    test("Should return true when server status is good", async () => {
      redisClient.get = jest.fn().mockResolvedValue(true);

      const serverStatus = await statusService.getServerStatus();
      expect(serverStatus).toEqual(true);
    });
  });

  describe("Function setServerStatus()", () => {
    test("Should return false when throw error", async () => {
      redisClient.set = jest.fn().mockRejectedValue("Error test");

      expect(statusService.setServerStatus(true)).rejects.toEqual("Error test");
    });
  });
});
