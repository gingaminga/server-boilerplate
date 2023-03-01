import { TStatusEventData } from "@customTypes/socket";
import { statusService } from "@loaders/service.loader";
import { Socket } from "socket.io";

export default (socket: Socket, data: TStatusEventData) => {
  const isGood = data === "good";
  const status = statusService.getServerStatus();

  const message = status === isGood ? "correct" : "incorrect";
  const response = {
    data: message,
  };

  socket.emit("status", response);
};
