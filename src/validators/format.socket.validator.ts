import { ISocketDataFormat } from "@/types/socket";
import joi from "joi";

export const checkCommonSocketDataSchema = joi.object<ISocketDataFormat<unknown>>().keys({
  data: joi.any().required(),
});

export const checkStatusEventDataSchema = joi.string().valid("good", "bad");
