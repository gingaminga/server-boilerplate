import logger from "@utils/logger";
import { makeDetailTextSocketEvent, makeTextSocket } from "@utils/index";
import { Socket } from "socket.io";

/**
 * @description 메시지를 전달 받을 때 로깅하기
 * @param socket Socket 객체
 */
const loggingReceiveEvent = (socket: Socket) => {
  socket.onAny((eventName: string, ...args: unknown[]) => {
    const message = makeDetailTextSocketEvent("receive", eventName, args[0]);
    logger.info(makeTextSocket(socket.id, message));
  });
};

/**
 * @description 클라이언트로 메시지 전달 시 로깅하기
 * @param socket Socket 객체
 */
const loggingSendEvent = (socket: Socket) => {
  const originalEmit = socket.emit;

  // 로깅을 위해 어쩔 수 없이 오버라이딩 해야함
  // eslint-disable-next-line no-param-reassign
  socket.emit = (eventName: string, ...args: unknown[]) => {
    originalEmit.apply(socket, [eventName, ...args] as [string, ...unknown[]]);

    const message = makeDetailTextSocketEvent("send", eventName, args[0]);
    logger.info(makeTextSocket(socket.id, message));

    return true;
  };
};

/**
 * @description 로깅하는 미들웨어
 * @param socket Socket 객체
 * @param next next 함수
 */
export default (socket: Socket, next: (err?: Error) => void) => {
  loggingReceiveEvent(socket);
  loggingSendEvent(socket);

  next();
};
