import { statusRepository } from "@loaders/repository.loader";
import { statusService } from "@loaders/service.loader";

describe("Status service test :)", () => {
  describe("Function getServerStatus()", () => {
    const response = {
      created_at: "",
      id: 1,
      status: 1,
    };

    test("Should return true", async () => {
      statusRepository.getStatus = jest.fn().mockResolvedValue(response);

      const serverStatus = await statusService.getServerStatus();
      expect(serverStatus).toEqual(true);
    });

    test("Should return false", async () => {
      response.status = 0;
      statusRepository.getStatus = jest.fn().mockResolvedValue(response);

      const serverStatus = await statusService.getServerStatus();
      expect(serverStatus).toEqual(false);
    });

    test("Should throw error", async () => {
      statusRepository.getStatus = jest.fn().mockRejectedValue("Error test");
      const serverStatus = await statusService.getServerStatus();
      expect(serverStatus).toEqual(false);
    });
  });

  describe("Function setServerStatus()", () => {
    test("Should return true", async () => {
      statusRepository.addOrModifyStatus = jest.fn().mockResolvedValue(true);

      const isSuccess1 = await statusService.setServerStatus(true);
      expect(isSuccess1).toEqual(true);

      const isSuccess2 = await statusService.setServerStatus(false);
      expect(isSuccess2).toEqual(true);
    });

    test("Should return false", async () => {
      statusRepository.addOrModifyStatus = jest.fn().mockRejectedValue("Error test");

      const isSuccess = await statusService.setServerStatus(true);
      expect(isSuccess).toEqual(false);
    });
  });
});
