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
  const { HTTPS, SSL } = constants;

  let server = null;

  if (HTTPS) {
    logger.info("HTTPS protocol :)");

    const config: ServerOptions = {
      cert: "",
      key: "",
      passphrase: "",
      pfx: "",
    };

    const { CERT, PFX, TYPE } = SSL;

    if (TYPE === "crt") {
      try {
        // CA 파일은 존재하지 않을 수도 있기 때문에 따로 예외 처리
        config.ca = fs.readFileSync(`${CERT.CA_FILE_PATH}`);
      } catch (error) {
        config.ca = "";
      }

      config.cert = fs.readFileSync(`${CERT.CERT_FILE_PATH}`);
      config.key = fs.readFileSync(`${CERT.KEY_FILE_PATH}`);
    } else if (TYPE === "pfx") {
      config.passphrase = PFX.PASSWORD;
      config.pfx = fs.readFileSync(`${PFX.PFX_FILE_PATH}`);
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
