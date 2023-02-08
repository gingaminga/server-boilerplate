import errorHandler from "@utils/custom-error";
import logger from "@utils/logger";
import colors from "ansi-colors";
import { createClient } from "redis";
import { Service } from "typedi";

interface IConnectionOption {
  host: string;
  port: number;
  password: string;
}

@Service()
export default class RedisClient {
  private instance!: ReturnType<typeof createClient>;

  /**
   * @description 상태 확인하기
   */
  private async checkStatus() {
    try {
      logger.info(`REDIS ${colors.blue("PING")}...`);

      const response = await this.instance.ping();

      logger.info(`REDIS ${colors.blue(response)} :)`);
    } catch (error) {
      errorHandler(error);
    }
  }

  /**
   * @description 연결하기
   * @param options connection option
   */
  private async connect(options: IConnectionOption) {
    try {
      const { host, port, password } = options;

      const connectionOption = {
        socket: {
          host,
          port,
        },
        password,
      };

      this.instance = createClient(connectionOption);

      await this.instance.connect();

      this.registerEvent();

      return true;
    } catch (error) {
      errorHandler(error);

      return false;
    }
  }

  /**
   * @description 값 삭제하기
   * @param key
   * @returns 삭제한 개수
   */
  async del(key: string) {
    const count = await this.instance.del(key);
    logger.debug(`Redis deleted ${count} ${key} value`);

    return count;
  }

  /**
   * @description 값 가져오기
   * @param key 키
   */
  async get(key: string) {
    const value = await this.instance.get(key);

    return value;
  }

  /**
   * @description 해쉬값 삭제하기
   * @param key 키
   * @param filed 필드
   * @returns 삭제한 개수
   */
  async hdel(key: string, filed: string) {
    const count = await this.instance.hDel(key, filed);
    logger.debug(`Redis deleted ${count} ${key}-${filed} hash value`);

    return count;
  }

  /**
   * @description 해시값 가져오기
   * @param key 키
   * @param filed 필드
   * @returns 해시값
   */
  async hget(key: string, filed: string) {
    const value = await this.instance.hGet(key, filed);

    return value;
  }

  /**
   * @description 해시값 추가하기
   * @param key 키
   * @param filed 필드
   * @param value 값
   * @returns 추가된 개수
   */
  async hset(key: string, filed: string, value: string) {
    const count = await this.instance.hSet(key, filed, value);
    logger.debug(`Redis added ${count} ${key}-${filed} hash value`);

    return count;
  }

  /**
   * @description 초기 설정하기
   * @param options connection option
   */
  async initialized(options: IConnectionOption) {
    const isConnect = await this.connect(options);

    if (isConnect) {
      await this.checkStatus();
    }
  }

  /**
   * @description 이벤트
   */
  private registerEvent() {
    this.instance.on("connect", () => {
      logger.info(`Redis ${colors.yellow("connect")}`);
    });

    this.instance.on("ready", () => {
      logger.info(`Redis ${colors.green("ready")}`);

      this.checkStatus();
    });

    this.instance.on("end", () => {
      logger.info(`Redis ${colors.grey("end")}`);
    });

    this.instance.on("error", (error) => {
      logger.error(`Redis error \n %o`, error);
    });

    this.instance.on("reconnecting", () => {
      logger.info(`Redis ${colors.magenta("reconnecting")}`);
    });
  }

  /**
   * @description 값 추가하기
   * @param key 키
   * @param value 값
   */
  async set(key: string, value: string) {
    const count = await this.instance.set(key, value);
    logger.debug(`Redis added ${count} ${key} value`);

    return value;
  }
}
