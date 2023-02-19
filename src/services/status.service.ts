import StatusRepository from "@databases/rdb/repositories/status.repository";
import { Inject, Service } from "typedi";

@Service()
export default class StatusService {
  constructor(@Inject() private statusRepository: StatusRepository) {
    /* empty */
  }

  /**
   * @description 서버 상태 가져오기
   */
  async getServerStatus() {
    const { status } = (await this.statusRepository.getStatus()) || {};

    return status === 1;
  }

  /**
   * @description 서버 상태 설정오기
   */
  async setServerStatus(status: boolean) {
    const value = status ? 1 : 0;
    await this.statusRepository.addOrModifyStatus(value);

    return true;
  }
}
