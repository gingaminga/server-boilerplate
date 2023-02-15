import StatusRepository from "@databases/rdb/repositories/status.repository";
import { relationDatabaseClient } from "@loaders/database.loader";
import logger from "@utils/logger";
import { Inject, Service } from "typedi";

@Service()
export default class StatusService {
  constructor(@Inject() private statusRepository: StatusRepository) {
    /* empty */
  }

  /**
   * @description 필수 인스턴스 확인
   */
  private static checkInstance() {
    return relationDatabaseClient.getInstance().isInitialized;
  }

  /**
   * @description 서버 상태 가져오기
   */
  async getServerStatus() {
    try {
      let status = await this.statusRepository.getStatus();

      if (!status) {
        // 상태가 없을 경우 설정
        const isGood = StatusService.checkInstance();
        await this.setServerStatus(isGood);

        status = await this.statusRepository.getStatus();
      }

      const isGood = status!.status === 1;

      return isGood;
    } catch (error) {
      logger.error(error);

      return false;
    }
  }

  /**
   * @description 서버 상태 설정오기
   */
  async setServerStatus(status: boolean) {
    try {
      const value = status ? 1 : 0;

      await this.statusRepository.addOrModifyStatus(value);

      return true;
    } catch (error) {
      logger.error(error);

      return false;
    }
  }
}
