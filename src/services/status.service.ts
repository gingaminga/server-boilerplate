import redisKey from "@databases/redis/key";
import { redisClient } from "@loaders/database.loader";
import { Service } from "typedi";

@Service()
export default class StatusService {
  private redisClient = redisClient;

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
