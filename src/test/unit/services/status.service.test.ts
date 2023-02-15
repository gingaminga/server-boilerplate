import { redisClient } from "@loaders/database.loader";
import { statusService } from "@loaders/service.loader";

describe("Status service test :)", () => {
  describe("Function getServerStatus()", () => {
    test("Should get server status", async () => {
      redisClient.get = jest.fn().mockResolvedValue(false);

      const serverStatus = await statusService.getServerStatus();
      expect(serverStatus).toEqual(false);
    });
  });

  describe("Function setServerStatus()", () => {
    test("Should set server status", async () => {
      redisClient.set = jest.fn().mockResolvedValue(true);
      await statusService.setServerStatus(true);

      redisClient.get = jest.fn().mockResolvedValue(true);
      const serverStatus = await statusService.getServerStatus();

      expect(serverStatus).toEqual(true);
    });
  });
});
