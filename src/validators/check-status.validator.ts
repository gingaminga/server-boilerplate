import { RequestDTOHandler } from "@customTypes/index";
import { CheckStatusRequestParamDTO } from "@dto/check-status.request.param.dto";
import joi from "joi";

interface ICheckStatusSchema {
  html: boolean;
}

const checkStatusSchema = joi.object<ICheckStatusSchema>().keys({
  html: joi.boolean(),
});

export const checkStatusValidator: RequestDTOHandler<CheckStatusRequestParamDTO> = async (req, res, next) => {
  const { html } = await checkStatusSchema.validateAsync(req.query);

  res.locals.dto = new CheckStatusRequestParamDTO(html);

  next();
};
