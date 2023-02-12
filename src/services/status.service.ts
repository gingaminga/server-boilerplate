import RedisClient from "@databases/redis/client";
import redisKey from "@databases/redis/key";
import logger from "@utils/logger";
import { Inject, Service } from "typedi";

@Service()
export default class StatusService {
  constructor(@Inject() private redisClient: RedisClient) {
    /* empty */
  }

  async getServerStatus() {
    try {
      let status = await this.redisClient.get<boolean>(redisKey.SERVER_STATUS);

      if (!status) {
        // 상태가 없을 경우 설정
        await this.setServerStatus(true);
        status = await this.redisClient.get<boolean>(redisKey.SERVER_STATUS);
      }

      return status;
    } catch (error) {
      logger.error(error);

      return false;
    }
  }

  async setServerStatus(status: boolean) {
    try {
      await this.redisClient.set(redisKey.SERVER_STATUS, status);

      return true;
    } catch (error) {
      logger.error(error);

      return false;
    }
  }
}
