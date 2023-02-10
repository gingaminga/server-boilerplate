import StatusService from "@services/status.service";
import { Container } from "typedi";

/**
 * @description 필수 초기 로더
 */
export const essentialInitLoader = () => {
  const statusService = Container.get(StatusService);
  statusService.setServerStatus(true);
};
