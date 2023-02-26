import { statusService } from "@loaders/service.loader";

describe("Status service test :)", () => {
  describe("Method getServerStatus", () => {
    test("Should get server status", () => {
      const serverStatus = statusService.getServerStatus();
      expect(serverStatus).toEqual(false);
    });
  });

  describe("Method setServerStatus", () => {
    test("Should set server status", () => {
      statusService.setServerStatus(true);

      const serverStatus = statusService.getServerStatus();
      expect(serverStatus).toEqual(true);
    });
  });
});
