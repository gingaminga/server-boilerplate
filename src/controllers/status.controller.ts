import { statusService } from "@/loaders/service.loader";
import { TStatusEventData } from "@/types/socket";
import { getResponseFormat } from "@/utils/index";
import { Socket } from "socket.io";

export default async (socket: Socket, data: TStatusEventData) => {
  const isGood = data === "good";
  const status = await statusService.getServerStatus();

  const message = status === isGood ? "correct" : "incorrect";
  const response = getResponseFormat(true, message);

  socket.emit("status", response);
};
