import CError from "@utils/error";
import HTTP_STATUS_CODE from "@utils/httpStatusCode";
import express from "express";

const enum RESPONSE_STATUS {
  FAIULRE = "FAIURE",
  SUCCESS = "SUCCESS",
}

/**
 * @description 응답 포맷
 * @param status 성공 실패 여부
 * @param data 전달할 데이터
 * @returns 전달할 JSON 객체
 */
const getResponseFormat = (status: boolean, data: any) => ({
  data,
  status: status ? RESPONSE_STATUS.SUCCESS : RESPONSE_STATUS.FAIULRE,
});

/**
 * @description 커스텀 응답 함수를 정의하는 미들웨어
 */
export default (req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.result = (data) => {
    const code = HTTP_STATUS_CODE.OK;

    res.status(code).json(getResponseFormat(true, data));
  };

  res.error = (error) => {
    const { code, message } = new CError(error);

    res.status(code).json(getResponseFormat(false, message));
  };

  next();
};
