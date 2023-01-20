import "dotenv/config";
import server from "@/app";
import constants from "@/utils/constants";
import logger from "@/utils/logger";

const PORT = server.get("port");

server.listen(PORT, () => {
  logger.info(`Hello! Start ${constants.PROJECT_NAME} API Server on port ${PORT} :)`);
});
