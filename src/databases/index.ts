import { relationDatabaseClient } from "@loaders/container.loader";
import relationDatabaseConfig from "@databases/rdb/config";

/**
 * @description RDB 실행
 */
export const startRelationDatabase = async () => {
  await relationDatabaseClient.initialized(relationDatabaseConfig);
};

/**
 * @description RDB 종료
 */
export const stopRelationDatabase = async () => {
  await relationDatabaseClient.close();
};
