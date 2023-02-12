import { statusService } from "@loaders/container.loader";

/**
 * @description 필수 초기 로더
 */
export const essentialInitLoader = () => {
  statusService.setServerStatus(true);
};
