import Status from "@databases/rdb/entities/status.entity";
import StatusRepository from "@databases/rdb/repositories/status.repository";
import RedisClient from "@databases/redis/client";
import StatusService from "@services/status.service";
import { InsertResult } from "typeorm";

describe("Status service test :)", () => {
  let redisClient: RedisClient;
  let statusRepository: StatusRepository;
  let statusService: StatusService;

  beforeEach(() => {
    redisClient = new RedisClient();
    statusRepository = new StatusRepository();
    statusService = new StatusService(statusRepository, redisClient);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Method getServerStatus", () => {
    let response: Status;

    beforeEach(() => {
      response = {
        created_at: new Date(),
        id: 1,
        status: 1,
      };
    });

    test("Should throw error when redis connection is bad", async () => {
      const error = new Error("Failure redis connect");
      jest.spyOn(redisClient, "get").mockRejectedValue(error);

      await expect(statusService.getServerStatus()).rejects.toThrowError(error);
    });

    test("Should throw error when RDB is not normal", async () => {
      const error = new Error("Failure RDB error");
      jest.spyOn(redisClient, "get").mockResolvedValue(null); // 에러가 나지 않도록 함
      jest.spyOn(statusRepository, "getStatus").mockRejectedValue(error);

      await expect(statusService.getServerStatus()).rejects.toThrowError(error);
    });

    test("Should return false when redis value is null and RDB return undefined", async () => {
      jest.spyOn(redisClient, "get").mockResolvedValue(null);
      jest.spyOn(statusRepository, "getStatus").mockResolvedValue(undefined);

      const serverStatus = await statusService.getServerStatus();
      expect(serverStatus).not.toBeTruthy();
    });

    test("Should return false when server status is bad", async () => {
      response.status = 0;
      jest.spyOn(redisClient, "get").mockResolvedValue("bad");
      jest.spyOn(statusRepository, "getStatus").mockResolvedValue(response);

      const serverStatus = await statusService.getServerStatus();
      expect(serverStatus).not.toBeTruthy();
    });

    test("Should return true", async () => {
      jest.spyOn(redisClient, "get").mockResolvedValue("good");
      jest.spyOn(statusRepository, "getStatus").mockResolvedValue(response);

      const serverStatus = await statusService.getServerStatus();

      expect(serverStatus).toBeTruthy();
    });
  });

  describe("Method setServerStatus", () => {
    const response = {} as InsertResult;

    test("Should throw error when redis connection is bad", async () => {
      const error = new Error("Failure redis connect");
      jest.spyOn(redisClient, "set").mockRejectedValue(error);

      await expect(statusService.setServerStatus(true)).rejects.toThrowError(error);
    });

    test("Should throw error when RDB is not normal", async () => {
      const error = new Error("Failure RDB error");
      jest.spyOn(redisClient, "set").mockResolvedValue(undefined); // 에러가 나지 않도록 함
      jest.spyOn(statusRepository, "addOrModifyStatus").mockRejectedValue(error);

      await expect(statusService.setServerStatus(true)).rejects.toThrowError(error);
    });

    test("Should return true", async () => {
      jest.spyOn(redisClient, "set").mockResolvedValue(undefined);
      jest.spyOn(statusRepository, "addOrModifyStatus").mockResolvedValue(response);

      const isSuccess = await statusService.setServerStatus(true);

      expect(isSuccess).toBeTruthy();
    });
  });
});
