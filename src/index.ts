import "reflect-metadata";
import "@utils/env";
import server from "@/app";
import { essentialInitLoader } from "@loaders/essential.loader";
import constants from "@utils/constants";
import logger from "@utils/logger";

const { PORT } = constants;

server.listen(PORT, () => {
  logger.info(`Hello! Start ${constants.PROJECT_NAME} API Server on port ${PORT} :)`);

  essentialInitLoader();
});
