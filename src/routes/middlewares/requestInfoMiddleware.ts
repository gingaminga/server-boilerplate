import logger from "@utils/logger";
import colors from "ansi-colors";
import onFinished from "on-finished";
import express from "express";

/**
 * @description 요청에 대한 시작 시간 로그 남기기
 * @param url 요청 url
 * @param method HTTP 메소드
 */
const requestStartTimeLog = (url: string, method: string) => {
  const startLog = colors.magenta(`Started [${method}] ${url}`);
  logger.info(startLog);
};

/**
 * @description 요청에 대한 종료 시간 로그 남기기
 * @param url 요청 url
 * @param method HTTP 메소드
 * @param takenTime 소요 시간
 */
const requestFinishTimeLog = (url: string, method: string, takenTime: number) => {
  const endLog = colors.magenta(`Finished [${method}] ${url} ${takenTime}ms`);
  logger.info(endLog);
};

/**
 * @description 요청에 대한 정보 로그 남기기
 * @param method HTTP 메소드
 * @param query query params
 * @param body body params
 * @param param param params
 */
const requestParameter = (method: string, query?: object, body?: object, param?: object) => {
  if (method === "GET" && query) {
    logger.info(`Query Parameters : ${JSON.stringify(query)}`);
  }

  if (body) {
    logger.info(`Body Parameters : ${JSON.stringify(body)}`);
  }

  if (param) {
    logger.info(`Param Parameters : ${JSON.stringify(param)}`);
  }
};

/**
 * @description 요청에 대한 정보를 로그로  미들웨어
 */
export default (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const { body, hostname, method, originalUrl, params, protocol, query } = req;

  const url = `${protocol}://${hostname}${originalUrl}`;
  const startTime = new Date().getTime();

  requestStartTimeLog(url, method);
  requestParameter(method, query, body, params);

  onFinished(res, (error, _res) => {
    const finishTime = new Date().getTime();
    const takenTime = finishTime - startTime; // 소요시간

    requestFinishTimeLog(url, method, takenTime);
  });

  next();
};
