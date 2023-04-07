import { makeDetailTextSocketEvent, makeTextSocket } from "@/utils/index";
import logger from "@/utils/logger";
import { DisconnectReason, Socket } from "socket.io";

export default (socket: Socket, reason: DisconnectReason) => {
  const message = makeDetailTextSocketEvent("receive", "disconnect", reason);
  logger.info(makeTextSocket(socket.id, message));
};
