import CError from "@utils/error";
import logger from "@utils/logger";
import colors from "ansi-colors";
import { createClient } from "redis";
import { Service } from "typedi";

interface IConnectionOption {
  host: string;
  password: string;
  port: number;
}

@Service()
export default class RedisClient {
  private connectStatus = false;

  private instance!: ReturnType<typeof createClient>;

  /**
   * @description 상태 확인하기
   */
  private async checkStatus() {
    logger.info(`REDIS ${colors.blue("PING")}...`);

    const response = await this.instance.ping();

    logger.info(`REDIS ${colors.blue(response)} :)`);
  }

  /**
   * @description 연결끊기
   * @returns 성공(true)/실패(false) 여부
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
      socket: {
        host,
        port,
      },
      password,
    };

    this.instance = createClient(connectionOption);

    await this.instance.connect();

    this.registerEvent();
  }

  /**
   * @description 값 삭제하기
   * @param key
   * @returns 삭제한 개수
   */
  async del(key: string) {
    this.isConnect();

    const count = await this.instance.del(key);
    logger.debug(`Redis deleted ${count} ${key} value`);
  }

  /**
   * @description 값 가져오기
   * @param key 키
   */
  async get(key: string) {
    this.isConnect();

    const value = await this.instance.get(key);
    logger.warn(`[Redis] Get ${key} has no value`);

    return value;
  }

  /**
   * @description 해쉬값 삭제하기
   * @param key 키
   * @param filed 필드
   * @returns 삭제한 개수
   */
  async hdel(key: string, filed: string) {
    this.isConnect();

    const count = await this.instance.hDel(key, filed);
    logger.debug(`Redis deleted ${count} ${key}-${filed} hash value`);
  }

  /**
   * @description 해시값 가져오기
   * @param key 키
   * @param filed 필드
   * @returns 해시값
   */
  async hget(key: string, filed: string) {
    this.isConnect();

    const value = await this.instance.hGet(key, filed);
    logger.warn(`[Redis] Get ${key}-${filed} has no value`);

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
    this.isConnect();

    const count = await this.instance.hSet(key, filed, value);
    logger.debug(`Redis added ${count} ${key}-${filed} hash ${value} value`);
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
    this.isConnect();

    const result = await this.instance.set(key, value);
    logger.debug(`Redis added ${key} value ${value} result ${result}`);

    if (!result) {
      throw new CError("Not connect redis.. :(");
    }
  }
}
