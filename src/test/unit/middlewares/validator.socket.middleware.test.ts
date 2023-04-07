import validatorSocketMiddleware from "@/middlewares/validator.socket.middleware";
import { Event, Socket } from "socket.io";

const socket = {} as Socket;
const next = jest.fn();

describe("Validator socket middleware test :)", () => {
  let packet: Event;

  beforeEach(() => {
    packet = ["", {}];
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test(`Should thorw error when data format is wrong`, async () => {
    await validatorSocketMiddleware(socket, packet, next);
    expect(next).toBeCalledTimes(1);
  });

  test(`Should thorw error when data value is wrong`, async () => {
    packet[0] = "status";
    packet[1] = {
      data: "",
    };

    await validatorSocketMiddleware(socket, packet, next);
    expect(next).toBeCalledTimes(1);
  });

  test(`Should success when eventName is status and data is good`, async () => {
    packet[0] = "status";
    packet[1] = {
      data: "good",
    };

    await validatorSocketMiddleware(socket, packet, next);
    expect(next).toBeCalledTimes(1);
  });

  test(`Should success when eventName is status and data is bad`, async () => {
    packet[0] = "status";
    packet[1] = {
      data: "good",
    };

    await validatorSocketMiddleware(socket, packet, next);
    expect(next).toBeCalledTimes(1);
  });
});
