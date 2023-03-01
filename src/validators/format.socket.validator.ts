import { ISocketDataFormat } from "@customTypes/socket";
import { Joi } from "celebrate";

export const checkCommonSocketDataSchema = Joi.object<ISocketDataFormat<unknown>>().keys({
  data: Joi.any(),
});

export const checkStatusEventDataSchema = Joi.string().valid("good", "bad");
