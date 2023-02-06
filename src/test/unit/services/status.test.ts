import StatusService from "@services/status.service";
import { Container } from "typedi";

describe("서버의 상태를 저장하는 서비스 :)", () => {
  const statusService = Container.get(StatusService);

  test("서버 상태 확인하기", () => {
    const serverStatus = statusService.getServerStatus();
    expect(serverStatus).toEqual(false);
  });

  test("서버 상태 변경하기", () => {
    statusService.setServerStatus(true);

    const serverStatus = statusService.getServerStatus();
    expect(serverStatus).toEqual(true);
  });
});
