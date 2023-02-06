import { celebrate, Joi, Segments } from "celebrate";

export const checkStatusSchema = celebrate({
  [Segments.QUERY]: {
    html: Joi.boolean(),
  },
});
