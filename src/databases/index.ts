import RedisClient from "@databases/redis/client";
import constants from "@utils/constants";
import { Container } from "typedi";

/**
 * @description 레디스 실행
 */
export const startRedis = async () => {
  const redisClient = Container.get(RedisClient);

  const options = {
    host: constants.REDIS.HOST,
    port: constants.REDIS.PORT,
    password: constants.REDIS.PASSWORD,
  };
  await redisClient.initialized(options);
};
