import HTTP_STATUS_CODE from "@utils/httpStatusCode";

export const enum ERROR_MESSAGE {
  BAD_REQUEST = "BAD_REQUEST",
  FORBIDDEN = "FORBIDDEN",
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
  INVALID_VALUE = "INVALID_VALUE",
  NOT_FOUND = "NOT_FOUND",
  UNAUTHORIZED = "UNAUTHORIZED",
}

export default class CError extends Error {
  public code = HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR;

  /**
   * @param error 에러 메시지 or error 객체
   * @param code http 상태 코드
   */
  constructor(error: string | Error | CError, code?: number) {
    super();

    if (typeof error === "string") {
      this.message = error;
    } else if (error instanceof Error) {
      this.message = error.message;
    }

    if (code) {
      this.code = code;
    }
  }
}
