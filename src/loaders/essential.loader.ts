import { statusService } from "@loaders/service.loader";
import RedisClient from "@redis/index";
import constants from "@utils/constants";
import { Container } from "typedi";

/**
 * @description 레디스 실행
 */
const startRedis = async () => {
  const redisClient = Container.get(RedisClient);

  const options = {
    host: constants.REDIS.HOST,
    port: constants.REDIS.PORT,
    password: constants.REDIS.PASSWORD,
  };
  await redisClient.initialized(options);
};

/**
 * @description 필수 초기 로더
 */
export const essentialInitLoader = async () => {
  await startRedis();

  statusService.setServerStatus(true);
};
