import logger from "@utils/logger";
import { parseJSON } from "@utils/index";
import { checkCommonSocketDataSchema, checkStatusEventDataSchema } from "@validators/format.socket.validator";
import { Event, Socket } from "socket.io";

/**
 * @description socket으로 받은 메시지의 포맷을 검사하는 미들웨어
 * @param packet 이벤트 객체
 * @param next next 함수
 */
export default async (socket: Socket, packet: Event, next: (err?: Error) => void) => {
  const [event, message] = packet;

  try {
    const parseData = parseJSON<object>(message);
    let { data } = await checkCommonSocketDataSchema.validateAsync(parseData);

    // 이벤트별 validate 검사하여 타입 보장
    if (event === "status") {
      data = await checkStatusEventDataSchema.validateAsync(data);
    }

    // 실제 컨트롤러에서 validator 처리된 값을 쓰기 위해 어쩔 수 없이 덮어 써야함
    // eslint-disable-next-line no-param-reassign
    packet[1] = data;

    next();
  } catch (error) {
    logger.error(error);

    socket.emit("error", error);
  }
};
