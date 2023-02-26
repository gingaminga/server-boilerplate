import constants from "@utils/constants";
import CError from "@utils/error";
import logger from "@utils/logger";
import { Express } from "express";
import fs from "fs";
import http from "http";
import https, { ServerOptions } from "https";

/**
 * @description 서버 객체 가져오기
 * @param app express app
 * @returns server 객체
 */
export const getServer = (app?: Express) => {
  const { HTTPS, SSL_CA_FILE_PATH, SSL_CERT_FILE_PATH, SSL_KEY_FILE_PATH, SSL_PFX_FILE_PATH, SSL_PFX_PASS, SSL_TYPE } =
    constants;

  let server = null;

  if (HTTPS) {
    logger.info("HTTPS protocol :)");

    const config: ServerOptions = {
      cert: "",
      key: "",
      passphrase: "",
      pfx: "",
    };

    if (SSL_TYPE === "crt") {
      try {
        // CA 파일은 존재하지 않을 수도 있기 때문에 따로 예외 처리
        config.ca = fs.readFileSync(`${SSL_CA_FILE_PATH}`);
      } catch (error) {
        config.ca = "";
      }

      config.cert = fs.readFileSync(`${SSL_CERT_FILE_PATH}`);
      config.key = fs.readFileSync(`${SSL_KEY_FILE_PATH}`);
    } else if (SSL_TYPE === "pfx") {
      config.passphrase = SSL_PFX_PASS;
      config.pfx = fs.readFileSync(`${SSL_PFX_FILE_PATH}`);
    } else {
      // 서비스 동작을 하지 못하도록 강제 throw
      throw new CError("Please setting SSL Type");
    }

    server = https.createServer(config, app);
  } else {
    logger.info("HTTP protocol :)");

    server = http.createServer(app);
  }

  return server;
};
