declare namespace NodeJS {
  interface ProcessEnv {
    LOG_MAX_FILES: number;
    LOG_MAX_SIZE: number;
    LOG_PATH: string;
    NODE_ENV: "development" | "production" | "test";
    PORT: number;
    PROJECT_NAME: string;
  }
}
