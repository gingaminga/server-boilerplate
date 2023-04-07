import Status from "@/databases/rdb/entities/status.entity";
import constants from "@/utils/constants";
import { DataSourceOptions } from "typeorm";

const entities = [Status];

const options: DataSourceOptions = {
  database: constants.DATABASE.SCHEMA,
  dropSchema: constants.NODE_ENV === "test",
  entities,
  host: constants.DATABASE.HOST,
  logging: constants.NODE_ENV === "development",
  password: constants.DATABASE.PASSWORD,
  port: constants.DATABASE.PORT,
  synchronize: true,
  type: constants.DATABASE.TYPE,
  username: constants.DATABASE.USER_NAME,
};

export default options;
