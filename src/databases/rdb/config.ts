import constants from "@utils/constants";
import path from "path";
import { DataSourceOptions } from "typeorm";

const options: DataSourceOptions = {
  database: constants.DATABASE.SCHEMA,
  dropSchema: constants.NODE_ENV === "test",
  entities: [path.join(__dirname, "/entities/*.{js,ts}")],
  host: constants.DATABASE.HOST,
  logging: process.env.NODE_ENV === "development",
  password: constants.DATABASE.PASSWORD,
  port: constants.DATABASE.PORT,
  synchronize: true,
  type: constants.DATABASE.TYPE,
  username: constants.DATABASE.USER_NAME,
};

export default options;
