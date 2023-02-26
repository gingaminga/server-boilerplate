// DB 관련 서비스들을 관리하는 로더

import RelationDatabaseClient from "@databases/rdb/client";
import { Container } from "typedi";

export const relationDatabaseClient = Container.get(RelationDatabaseClient);
