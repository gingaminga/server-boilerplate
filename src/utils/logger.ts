import constants from "@utils/constants";
import colors from "ansi-colors";
import path from "path";
import winston from "winston";
import WinstonDailyLog from "winston-daily-rotate-file";

const { combine, label, printf, splat, timestamp } = winston.format;
const logDir = constants.LOG_PATH || "../../logs";

const enum Level {
  ERROR = "error",
  WARN = "warn",
  INFO = "info",
  HTTP = "http",
  VERBOSE = "verbose",
  DEBUG = "debug",
  SILLY = "silly",
}

const logFormat = printf((info) => {
  let { message, level } = info;

  switch (level) {
    case Level.ERROR: {
      level = colors.red(level);
      message = colors.red(message);

      break;
    }
    case Level.WARN: {
      level = colors.yellow(level);
      message = colors.yellow(message);

      break;
    }
    case Level.INFO: {
      level = colors.green(level);

      break;
    }
    case Level.DEBUG: {
      level = colors.grey(level);
      message = colors.grey(message);

      break;
    }
    case Level.HTTP:
    case Level.VERBOSE:
    case Level.SILLY:
    default: {
      break;
    }
  }

  return `#[${colors.bgRedBright(info.label)}] ${colors.whiteBright(info.timestamp)} [${level}]: ${message}`;
});

export default winston.createLogger({
  format: combine(
    timestamp({
      format: "YYYY-MM-DD HH:mm:ss.SSS",
    }),
    label({ label: constants.PROJECT_NAME }),
    splat(),
    logFormat,
  ),
  transports: [
    new winston.transports.Console({
      level: constants.NODE_ENV === "production" ? Level.INFO : Level.DEBUG,
    }),
    new WinstonDailyLog({
      datePattern: "YYYYMMDD",
      dirname: path.resolve(__dirname, logDir),
      filename: `${constants.PROJECT_NAME}_%DATE%.log`,
      level: constants.NODE_ENV === "production" ? Level.INFO : Level.DEBUG,
      maxFiles: constants.LOG_MAX_FILES,
      maxSize: constants.LOG_MAX_SIZE,
      zippedArchive: constants.NODE_ENV !== "development",
    }),
  ],
});
