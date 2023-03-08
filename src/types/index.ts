import { NextFunction, Request, RequestHandler, Response } from "express";

export type RequestDTOHandler<T> = (
  req: Request,
  res: Response & {
    locals: Response["locals"] & {
      dto: T;
    };
  },
  next: NextFunction,
) => ReturnType<RequestHandler>;
