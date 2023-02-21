import Status from "@databases/rdb/entities/status.entity";
import { statusRepository } from "@loaders/repository.loader";
import { statusService } from "@loaders/service.loader";
import { InsertResult } from "typeorm";

describe("Status service test :)", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Function getServerStatus()", () => {
    let response: Status;

    beforeEach(() => {
      response = {
        created_at: new Date(),
        id: 1,
        status: 1,
      };
    });

    test("Should throw error when RDB connection is bad", async () => {
      const error = new Error("Failure RDB disconnect ");
      jest.spyOn(statusRepository, "getStatus").mockRejectedValue(error);

      await expect(statusService.getServerStatus()).rejects.toThrowError(error);
    });

    test("Should return false", async () => {
      response.status = 0;
      jest.spyOn(statusRepository, "getStatus").mockResolvedValue(response);

      const serverStatus = await statusService.getServerStatus();
      expect(serverStatus).toEqual(false);
    });

    test("Should return true", async () => {
      jest.spyOn(statusRepository, "getStatus").mockResolvedValue(response);

      const serverStatus = await statusService.getServerStatus();
      expect(serverStatus).toEqual(true);
    });
  });

  describe("Function setServerStatus()", () => {
    const response = {} as InsertResult;

    test("Should throw error when RDB connection is bad", async () => {
      const error = new Error("Failure RDB disconnect ");
      jest.spyOn(statusRepository, "addOrModifyStatus").mockRejectedValue(error);

      await expect(statusService.setServerStatus(true)).rejects.toThrowError(error);
    });

    test("Should return true", async () => {
      jest.spyOn(statusRepository, "addOrModifyStatus").mockResolvedValue(response);

      const serverStatus = await statusService.setServerStatus(true);
      expect(serverStatus).toEqual(true);
    });
  });
});
