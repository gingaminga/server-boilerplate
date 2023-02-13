import RedisClient from "@databases/redis/client";
import StatusService from "@services/status.service";
import { Container } from "typedi";

export const redisClient = Container.get(RedisClient);
export const statusService = Container.get(StatusService);
