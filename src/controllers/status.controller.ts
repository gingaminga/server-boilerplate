import { Socket } from "socket.io";

export default (socket: Socket, message: any) => {
  socket.emit("test", 10);
};
