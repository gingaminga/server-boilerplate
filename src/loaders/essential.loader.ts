import { statusService } from "@loaders/service.loader";

/**
 * @description 필수 초기 로더
 */
export const essentialInitLoader = () => {
  statusService.setServerStatus(true);
};
