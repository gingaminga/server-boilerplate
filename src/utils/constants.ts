import dotenv from "dotenv";

dotenv.config();

export default {
  LOG_MAX_FILES: process.env.LOG_MAX_FILES || 3,
  LOG_MAX_SIZE: process.env.LOG_MAX_SIZE || 10,
  LOG_PATH: process.env.LOG_PATH,
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 3001, // 서버 포트
  PROJECT_NAME: "LIP",
};
