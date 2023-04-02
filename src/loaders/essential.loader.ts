import { startRedis } from "@/databases/index";
import { statusService } from "@/loaders/service.loader";
import logger from "@/utils/logger";

/**
 * @description 필수 초기 로더
 */
export const essentialInitLoader = async () => {
  try {
    await startRedis();

    await statusService.setServerStatus(true);
  } catch (error) {
    logger.error(error);
  }
};
