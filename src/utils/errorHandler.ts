import CError from "@utils/error";
import logger from "@utils/logger";
import constants from "./constants";

export default (error: unknown): CError => {
  const customError = new CError(error);

  if (constants.NODE_ENV !== "production") {
    logger.error(customError.stack);
  } else {
    logger.error(customError.message);
  }

  return customError;
};
