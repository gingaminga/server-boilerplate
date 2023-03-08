import { NextFunction, Request, RequestHandler, Response } from "express";

/**
 * @description RequestHandler + DTO 커스텀
 */
export type RequestDTOHandler<T> = (
  req: Request,
  res: Response & {
    locals: Response["locals"] & {
      dto: T;
    };
  },
  next: NextFunction,
) => ReturnType<RequestHandler>;
