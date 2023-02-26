import RedisClient from "@databases/redis/client";
import redisKey from "@databases/redis/key";
import { Inject, Service } from "typedi";

@Service()
export default class StatusService {
  constructor(@Inject() private redisClient: RedisClient) {
    /* empty */
  }

  async getServerStatus() {
    const status = await this.redisClient.get(redisKey.SERVER_STATUS);

    const isGood = status === "good";

    return isGood;
  }

  async setServerStatus(isGood: boolean) {
    const status = isGood ? "good" : "bad";

    await this.redisClient.set(redisKey.SERVER_STATUS, status);

    return true;
  }
}
