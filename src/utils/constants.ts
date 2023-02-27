export default {
  DATABASE: {
    HOST: process.env.DATABASE_HOST || "127.0.0.1",
    PASSWORD: process.env.DATABASE_PASSWORD || "",
    PORT: Number(process.env.DATABASE_PORT || 3306),
    SCHEMA: process.env.DATABASE_SCHEMA || "test",
    TYPE: process.env.DATABASE_TYPE || "mysql",
    USER_NAME: process.env.DATABASE_USER_NAME || "root",
  },
  HTTPS: process.env.HTTPS === "true",
  LOG: {
    MAX_FILES: Number(process.env.LOG_MAX_FILES || 3),
    MAX_SIZE: Number(process.env.LOG_MAX_SIZE || "10m"),
    PATH: process.env.LOG_PATH,
  },
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: Number(process.env.PORT || 3001), // 서버 포트
  PROJECT_NAME: process.env.PROJECT_NAME || "Sample Project Name",
  SSL: {
    CERT: {
      CA_FILE_PATH: process.env.HTTPS === "true" ? process.env.SSL_CA_FILE_PATH : "", // CA 파일
      CERT_FILE_PATH: process.env.HTTPS === "true" ? process.env.SSL_CERT_FILE_PATH : "", // cert 파일
      KEY_FILE_PATH: process.env.HTTPS === "true" ? process.env.SSL_KEY_FILE_PATH : "", // key 파일
    },
    PFX: {
      PFX_FILE_PATH: process.env.HTTPS === "true" ? process.env.SSL_PFX_FILE_PATH : "", // pfx 파일
      PASSWORD: process.env.HTTPS === "true" ? process.env.SSL_PFX_PASS : "", // pfx 비밀번호
    },
    TYPE: process.env.HTTPS === "true" ? process.env.SSL_TYPE : "",
  },
};
