import { ISocketDataFormat } from "@customTypes/socket";
import { Joi } from "celebrate";

export const checkSocketSchema = Joi.object<ISocketDataFormat<unknown>>().keys({
  data: Joi.any(),
});
