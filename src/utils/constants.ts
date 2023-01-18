import dotenv from "dotenv";

dotenv.config();

export default {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 3001, // 서버 포트
  PROJECT_NAME: "LIP",
};
