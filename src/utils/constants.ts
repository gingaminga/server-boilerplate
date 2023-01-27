export default {
  HTTPS: process.env.HTTPS === "true",
  LOG_MAX_FILES: Number(process.env.LOG_MAX_FILES || 3),
  LOG_MAX_SIZE: Number(process.env.LOG_MAX_SIZE || "10m"),
  LOG_PATH: process.env.LOG_PATH,
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: Number(process.env.PORT || 3001), // 서버 포트
  PROJECT_NAME: process.env.PROJECT_NAME || "Sample Project Name",
  REDIS: {
    HOST: process.env.REDIS_HOST || "127.0.0.1",
    PASSWORD: process.env.REDIS_PASS || "",
    PORT: Number(process.env.REDIS_PORT || 6379),
  },
  SSL_CA_FILE_PATH: process.env.HTTPS === "true" ? process.env.SSL_CA_FILE_PATH : "", // CA 파일
  SSL_CERT_FILE_PATH: process.env.HTTPS === "true" ? process.env.SSL_CERT_FILE_PATH : "", // cert 파일
  SSL_KEY_FILE_PATH: process.env.HTTPS === "true" ? process.env.SSL_KEY_FILE_PATH : "", // key 파일
  SSL_PFX_FILE_PATH: process.env.HTTPS === "true" ? process.env.SSL_PFX_FILE_PATH : "", // pfx 파일
  SSL_PFX_PASS: process.env.HTTPS === "true" ? process.env.SSL_PFX_PASS : "", // pfx 비밀번호
  SSL_TYPE: process.env.HTTPS === "true" ? process.env.SSL_TYPE : "",
};
