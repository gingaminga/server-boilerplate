import "reflect-metadata";
import StatusService from "@services/status";
import { Container } from "typedi";

/**
 * @description 필수 초기 로더
 */
const essentialInitLoader = () => {
  const statusService = Container.get(StatusService);
  statusService.setServerStatus(true);
};

export default essentialInitLoader;
