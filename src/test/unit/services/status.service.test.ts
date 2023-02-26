import { redisClient } from "@loaders/database.loader";
import { statusService } from "@loaders/service.loader";

describe("Status service test :)", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Method getServerStatus", () => {
    test("Should throw error when redis connection is bad", async () => {
      const error = new Error("Failure redis connect");
      jest.spyOn(redisClient, "get").mockRejectedValue(error);

      await expect(statusService.getServerStatus()).rejects.toThrowError(error);
    });

    test("Should return false when redis value is null", async () => {
      jest.spyOn(redisClient, "get").mockResolvedValue(null);

      const serverStatus = await statusService.getServerStatus();
      expect(serverStatus).not.toBeTruthy();
    });

    test("Should return false when server status is bad", async () => {
      jest.spyOn(redisClient, "get").mockResolvedValue("bad");

      const serverStatus = await statusService.getServerStatus();
      expect(serverStatus).not.toBeTruthy();
    });

    test("Should return true when server status is good", async () => {
      jest.spyOn(redisClient, "get").mockResolvedValue("good");

      const serverStatus = await statusService.getServerStatus();

      expect(serverStatus).toBeTruthy();
    });
  });

  describe("Method setServerStatus", () => {
    test("Should throw error when redis connection is bad", async () => {
      const error = new Error("Failure redis connect");
      jest.spyOn(redisClient, "set").mockRejectedValue(error);

      await expect(statusService.setServerStatus(true)).rejects.toThrowError(error);
    });

    test("Should return true", async () => {
      jest.spyOn(redisClient, "set").mockResolvedValue(undefined);

      const isSuccess = await statusService.getServerStatus();

      expect(isSuccess).toBeTruthy();
    });
  });
});
