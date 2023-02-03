import constants from "@utils/constants";
import CError from "@utils/error";
import logger from "@utils/logger";

export default (error: unknown): CError => {
  const customError = new CError(error);

  if (constants.NODE_ENV !== "production") {
    logger.error(customError.stack);
  } else {
    logger.error(customError.message);
  }

  return customError;
};
