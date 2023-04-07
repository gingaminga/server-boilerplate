// 서비스들을 관리하는 로더

import StatusService from "@/services/status.service";
import { Container } from "typedi";

export const statusService = Container.get(StatusService);
