import StatusRepository from "@databases/rdb/repositories/status.repository";
import { Container } from "typedi";

export const statusRepository = Container.get(StatusRepository);
