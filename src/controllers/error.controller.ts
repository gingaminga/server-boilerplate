import { getResponseFormat } from "@/utils";
import CError from "@utils/error";
import logger from "@utils/logger";
import { Socket } from "socket.io";

export default (socket: Socket, reason: Error) => {
  const cerror = new CError(reason);
  logger.error(cerror);

  socket.emit("error", getResponseFormat(false, cerror.message));
};
