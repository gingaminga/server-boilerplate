import { RESPONSE_STATUS } from "@/utils/response";
import colors from "ansi-colors";

/**
 * @description 응답 포맷
 * @param status 성공 실패 여부
 * @param data 전달할 데이터
 * @returns 전달할 JSON 객체
 */
export const getResponseFormat = (status: boolean, data: any) => ({
  data,
  status: status ? RESPONSE_STATUS.SUCCESS : RESPONSE_STATUS.FAILURE,
});

/**
 * @description JSON parsing하기
 * @param value JSON.stringify가 적용된 문자열
 */
export const parseJSON = <T>(value: string) => {
  try {
    const realValue: T = JSON.parse(value);

    return realValue;
  } catch (error) {
    /* empty */
  }

  return null;
};

/**
 * @description 소켓 이벤트 발생 텍스트 만들기
 * @param eventType 수신/전송 타입 (on | emit)
 * @param eventName 이벤트명
 * @param data 전달받은(한) 데이터
 */
export const makeDetailTextSocketEvent = (eventType: "send" | "receive", eventName: string, data: any) =>
  `${eventType} ${eventName} event, data => ${colors.cyanBright(JSON.stringify(data))}`;

/**
 * @description 소켓 관련 텍스트 만들기
 * @param id socket id
 * @param message 메시지 내용
 */
export const makeTextSocket = (id: string, message: string) => `${colors.underline.blueBright(id)} ${message}`;
