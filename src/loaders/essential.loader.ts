import { startRedis } from "@databases/index";
import { statusService } from "@loaders/service.loader";

/**
 * @description 필수 초기 로더
 */
export const essentialInitLoader = async () => {
  await startRedis();

  statusService.setServerStatus(true);
};
