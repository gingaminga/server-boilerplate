import RedisClient from "@databases/redis/client";
import { statusService } from "@loaders/service.loader";
import { Container } from "typedi";

describe("Status service test :)", () => {
  const redisClient = Container.get(RedisClient);

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
