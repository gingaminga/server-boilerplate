import RelationDatabaseClient from "@databases/rdb/client";
import { Container } from "typedi";

export const relationDatabaseClient = Container.get(RelationDatabaseClient);
