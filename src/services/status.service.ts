import { Service } from "typedi";

@Service()
export default class StatusService {
  private serverStatus = false; // 서버 상태

  getServerStatus() {
    return this.serverStatus;
  }

  setServerStatus(status: boolean) {
    this.serverStatus = status;
  }
}
