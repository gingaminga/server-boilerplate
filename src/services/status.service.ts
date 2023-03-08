import StatusRepository from "@databases/rdb/repositories/status.repository";
import RedisClient from "@databases/redis/client";
import redisKey from "@databases/redis/key";
import { Inject, Service } from "typedi";

@Service()
export default class StatusService {
  constructor(@Inject() private statusRepository: StatusRepository, @Inject() private redisClient: RedisClient) {
    /* empty */
  }

  async getServerStatus() {
    const redisStatus = await this.redisClient.get(redisKey.SERVER_STATUS);
    const { status: rdbStatus } = (await this.statusRepository.getStatus()) || {};

    const isGood = redisStatus === "good" && rdbStatus === 1;

    return isGood;
  }

  async setServerStatus(isGood: boolean) {
    const redisStatus = isGood ? "good" : "bad";
    const rdbStatus = isGood ? 1 : 0;

    await this.redisClient.set(redisKey.SERVER_STATUS, redisStatus);
    await this.statusRepository.addOrModifyStatus(rdbStatus);

    return true;
  }
}
