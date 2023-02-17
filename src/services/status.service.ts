import RedisClient from "@databases/redis/client";
import redisKey from "@databases/redis/key";
import { Inject, Service } from "typedi";

@Service()
export default class StatusService {
  constructor(@Inject() private redisClient: RedisClient) {
    /* empty */
  }

  async getServerStatus() {
    const status = await this.redisClient.get<boolean>(redisKey.SERVER_STATUS);

    return status;
  }

  async setServerStatus(status: boolean) {
    await this.redisClient.set(redisKey.SERVER_STATUS, status);

    return true;
  }
}
