import disconnectEventController from "@controllers/socket/disconnect-event.controller";
import statusEventController from "@controllers/socket/status-event.controller";
import socketLoggingMiddleware from "@middlewares/socket-logging.middleware";
import logger from "@utils/logger";
import { makeTextSocket } from "@utils/index";
import { IncomingMessage, Server as httpServer, ServerResponse } from "http";
import { Server as httpsServer } from "https";
import { Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

/**
 * @description socket io 미들웨어 등록하기
 * @param io socket io 객체
 */
const registerMiddlewares = (io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {
  io.use(socketLoggingMiddleware);
};

/**
 * @description 이벤트 핸들러 등록하기
 * @param io socket io 객체
 */
const registerHandlers = (io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {
  io.on("connection", (socket) => {
    logger.info(makeTextSocket(socket.id, "Hi :D"));

    socket.on("disconnect", (reason) => {
      disconnectEventController(socket, reason);
    });

    socket.on("status", (data) => {
      statusEventController(socket, data);
    });
  });
};

/**
 * @description 소켓 서버 실행하기
 * @param server http server
 * @returns socket io 객체
 */
export const loadSocketServer = (
  server:
    | httpServer<typeof IncomingMessage, typeof ServerResponse>
    | httpsServer<typeof IncomingMessage, typeof ServerResponse>,
) => {
  const io = new Server(server);

  registerMiddlewares(io);
  registerHandlers(io);

  return io;
};
