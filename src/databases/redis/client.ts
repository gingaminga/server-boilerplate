import CError from "@/utils/error";
import logger from "@/utils/logger";
import colors from "ansi-colors";
import { createClient } from "redis";

interface IConnectionOption {
  host: string;
  password: string;
  port: number;
}

export default class RedisClient {
  private connectStatus = false;

  private instance!: ReturnType<typeof createClient>;

  /**
   * @description 상태 확인하기
   */
  private async checkStatus() {
    logger.info(`[REDIS] ${colors.blue("PING")}...`);

    const response = await this.instance.ping();

    logger.info(`[REDIS] ${colors.blue(response)} :)`);
  }

  /**
   * @description 연결끊기
   */
  async close() {
    await this.instance.disconnect();

    this.connectStatus = false;
  }

  /**
   * @description 연결하기
   * @param options connection option
   */
  private async connect(options: IConnectionOption) {
    const { host, port, password } = options;

    const connectionOption = {
      password,
      reconnectStrategy() {
        return 3000;
      },
      socket: {
        host,
        port,
      },
    };

    this.instance = createClient(connectionOption);

    await this.instance.connect();

    this.registerEvent();
  }

  /**
   * @description 값 삭제하기
   * @param key 키
   */
  async del(key: string) {
    this.isConnect();

    const count = await this.instance.del(key);
    logger.debug(`[Redis] Deleted ${count} ${key} keys`);
  }

  /**
   * @description 값 가져오기
   * @param key 키
   * @returns 값
   */
  async get(key: string) {
    this.isConnect();

    const value = await this.instance.get(key);
    if (typeof value !== "string") {
      logger.warn(`[Redis] Get ${key} key has no value`);

      return null;
    }

    return value;
  }

  /**
   * @description 해쉬값 삭제하기
   * @param key 키
   * @param field 필드
   */
  async hdel(key: string, field: string) {
    this.isConnect();

    const count = await this.instance.hDel(key, field);
    logger.debug(`[Redis] Deleted hash ${count} ${key}-${field} keys-field`);
  }

  /**
   * @description 해시값 가져오기
   * @param key 키
   * @param field 필드
   * @returns 해시값
   */
  async hget(key: string, field: string) {
    this.isConnect();

    const value = await this.instance.hGet(key, field);
    if (typeof value !== "string") {
      logger.warn(`[Redis] Get hash ${key}-${field} key-field has no value`);

      return null;
    }

    return value;
  }

  /**
   * @description 해시값 추가하기
   * @param key 키
   * @param field 필드
   * @param value 값
   */
  async hset(key: string, field: string, value: string) {
    this.isConnect();

    const count = await this.instance.hSet(key, field, value);
    logger.debug(`[Redis] Added hash ${count} ${key}-${field} key-field`);
  }

  /**
   * @description 초기 설정하기
   * @param options connection option
   */
  async initialized(options: IConnectionOption) {
    await this.connect(options);
    await this.checkStatus();

    this.connectStatus = true;
  }

  /**
   * @description 연결 상태 확인
   */
  private isConnect() {
    if (!this.connectStatus) {
      throw new CError("Not connect redis.. :(");
    }
  }

  /**
   * @description 이벤트
   */
  private registerEvent() {
    this.instance.on("connect", () => {
      logger.info(`[Redis] ${colors.yellow("connect")}`);
    });

    this.instance.on("ready", () => {
      logger.info(`[Redis] ${colors.green("ready")}`);

      this.checkStatus();
    });

    this.instance.on("end", () => {
      logger.info(`[Redis] ${colors.grey("end")}`);
    });

    this.instance.on("error", (error) => {
      logger.error(`[Redis] error \n %o`, error);
    });

    this.instance.on("reconnecting", () => {
      logger.info(`[Redis] ${colors.magenta("reconnecting")}`);
    });
  }

  /**
   * @description 값 추가하기
   * @param key 키
   * @param value 값
   */
  async set(key: string, value: string) {
    this.isConnect();

    const result = await this.instance.set(key, value);
    logger.debug(`[Redis] Added ${result} result by ${key}`);
  }
}
