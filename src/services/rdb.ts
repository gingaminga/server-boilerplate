import constants from "@utils/constants";
import errorHandler from "@utils/custom-error";
import logger from "@utils/logger";
import colors from "ansi-colors";
import { Service } from "typedi";
import { DataSource, DataSourceOptions } from "typeorm";

@Service()
export default class RelationDatabaseService {
  private instance!: DataSource;

  /**
   * @description 연결하기
   * @param options connection option
   */
  private async connect(options: DataSourceOptions) {
    try {
      this.instance = new DataSource(options);

      await this.instance.initialize();

      return true;
    } catch (error) {
      errorHandler(error);

      return false;
    }
  }

  /**
   * @description datasource instance 가져오기
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
