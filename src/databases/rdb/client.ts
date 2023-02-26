import constants from "@utils/constants";
import logger from "@utils/logger";
import colors from "ansi-colors";
import { Service } from "typedi";
import { DataSource, DataSourceOptions } from "typeorm";
import { createDatabase } from "typeorm-extension";

@Service()
export default class RelationDatabaseClient {
  private instance!: DataSource;

  /**
   * @description 연결 끊기
   * @param options connection option
   */
  async close() {
    await this.instance.destroy();
  }

  /**
   * @description 연결하기
   * @param options connection option
   * @returns true
   */
  private async connect(options: DataSourceOptions) {
    await createDatabase({
      options,
      ifNotExist: true,
    });

    this.instance = new DataSource(options);

    await this.instance.initialize();

    return true;
  }

  /**
   * @description datasource instance 가져오기
   * @returns 연결된 orm 객체
   */
  getInstance() {
    return this.instance;
  }

  /**
   * @description 초기 설정하기
   * @param options connection option
   */
  async initialized(options: DataSourceOptions) {
    const isConnect = await this.connect(options);

    if (isConnect) {
      logger.info(`${constants.DATABASE.TYPE} connect ${colors.green("success")} :)`);
    }
  }
}
