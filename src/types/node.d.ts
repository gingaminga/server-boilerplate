declare namespace NodeJS {
  interface ProcessEnv {
    HTTPS: "true" | "false";
    LOG_MAX_FILES: number;
    LOG_MAX_SIZE: string;
    LOG_PATH: string;
    NODE_ENV: "development" | "production" | "test";
    PORT: number;
    PROJECT_NAME: string;
    SSL_CA_FILE_PATH: string;
    SSL_CERT_FILE_PATH: string;
    SSL_KEY_FILE_PATH: string;
    SSL_PFX_FILE_PATH: string;
    SSL_PFX_PASS: string;
    SSL_TYPE: "crt" | "pfx";
  }
}
