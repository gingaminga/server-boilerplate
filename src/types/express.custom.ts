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

/**
 * @description Response + DTO 커스텀
 */
export type ResponseDTO<T> = Response<any, Record<string, any>> & {
  locals: Record<string, any> & { dto: T };
};
