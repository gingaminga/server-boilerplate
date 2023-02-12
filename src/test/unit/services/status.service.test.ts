import { statusService } from "@loaders/container.loader";

describe("Status service test :)", () => {
  test("Get server init status", () => {
    const serverStatus = statusService.getServerStatus();
    expect(serverStatus).toEqual(false);
  });

  test("Set good server status and check status", () => {
    statusService.setServerStatus(true);

    const serverStatus = statusService.getServerStatus();
    expect(serverStatus).toEqual(true);
  });
});
