import { RequestDTOHandler } from "@customTypes/express.custom";
import { CheckStatusRequestParamDTO } from "@dto/check-status.request.param.dto";
import { statusService } from "@loaders/service.loader";
import { RESPONSE_MESSAGE } from "@utils/response";

/**
 * @description 서버 상태를 체크하는 컨트롤러
 * @param req Request
 * @param res Response
 */
export const checkStatusController: RequestDTOHandler<CheckStatusRequestParamDTO> = (req, res) => {
  const isHtml = res.locals.dto.isHTML;

  const isGood = statusService.getServerStatus();

  const data = isGood ? RESPONSE_MESSAGE.GOOD : RESPONSE_MESSAGE.BAD;

  if (isHtml) {
    res.send(data);

    return;
  }

  res.result(data);
};
