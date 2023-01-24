// http status code 중 자주 사용하는 것들만 넣었어요.

const enum HTTP_STATUS_CODE {
  BAD_REQUEST = 400,
  FORBIDDEN = 403,
  INTERNAL_SERVER_ERROR = 500,
  INVALID_VALUE = 422,
  NOT_FOUND = 404,
  OK = 200,
  UNAUTHORIZED = 401,
}

export default HTTP_STATUS_CODE;
