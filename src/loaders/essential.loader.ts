import { startRelationDatabase } from "@databases/index";
import { statusService } from "@loaders/service.loader";

/**
 * @description 필수 초기 로더
 */
export const essentialInitLoader = async () => {
  await startRelationDatabase();

  statusService.setServerStatus(true);
};
