import StatusService from "@services/status.service";
import { Container } from "typedi";

describe("Status service test :)", () => {
  const statusService = Container.get(StatusService);

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
