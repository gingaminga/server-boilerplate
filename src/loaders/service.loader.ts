import StatusService from "@services/status.service";
import { Container } from "typedi";

export const statusService = Container.get(StatusService);
