import RelationDatabaseClient from "@databases/rdb/client";
import StatusService from "@services/status.service";
import { Container } from "typedi";

export const relationDatabaseClient = Container.get(RelationDatabaseClient);
export const statusService = Container.get(StatusService);
