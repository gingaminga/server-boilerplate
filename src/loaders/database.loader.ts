// DB 관련 서비스들을 관리하는 로더

import RedisClient from "@databases/redis/client";
import { Container } from "typedi";

export const redisClient = Container.get(RedisClient);
