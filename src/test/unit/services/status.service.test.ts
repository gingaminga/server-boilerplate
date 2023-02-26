import Status from "@databases/rdb/entities/status.entity";
import StatusRepository from "@databases/rdb/repositories/status.repository";
import StatusService from "@services/status.service";
import { InsertResult } from "typeorm";

describe("Status service test :)", () => {
  let statusRepository: StatusRepository;
  let statusService: StatusService;

  beforeEach(() => {
    statusRepository = new StatusRepository();
    statusService = new StatusService(statusRepository);
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

    test("Should throw error when RDB is not normal", async () => {
      const error = new Error("Failure RDB error");
      jest.spyOn(statusRepository, "getStatus").mockRejectedValue(error);

      await expect(statusService.getServerStatus()).rejects.toThrowError(error);
    });

    test("Should return false when RDB return undefined", async () => {
      jest.spyOn(statusRepository, "getStatus").mockResolvedValue(undefined);

      const serverStatus = await statusService.getServerStatus();
      expect(serverStatus).not.toBeTruthy();
    });

    test("Should return false when server status is bad", async () => {
      response.status = 0;
      jest.spyOn(statusRepository, "getStatus").mockResolvedValue(response);

      const serverStatus = await statusService.getServerStatus();
      expect(serverStatus).not.toBeTruthy();
    });

    test("Should return true", async () => {
      jest.spyOn(statusRepository, "getStatus").mockResolvedValue(response);

      const serverStatus = await statusService.getServerStatus();
      expect(serverStatus).toBeTruthy();
    });
  });

  describe("Method setServerStatus", () => {
    const response = {} as InsertResult;

    test("Should throw error when RDB is not normal", async () => {
      const error = new Error("Failure RDB error");
      jest.spyOn(statusRepository, "addOrModifyStatus").mockRejectedValue(error);

      await expect(statusService.setServerStatus(true)).rejects.toThrowError(error);
    });

    test("Should return true", async () => {
      jest.spyOn(statusRepository, "addOrModifyStatus").mockResolvedValue(response);

      const serverStatus = await statusService.setServerStatus(true);
      expect(serverStatus).toBeTruthy();
    });
  });
});
