import server from "@/app";
import logger from "@/utils/logger";

const PORT = server.get("port");

server.listen(PORT, () => {
  logger.info(`Hello! Start LIP API Server on port ${PORT} :)`);
});
