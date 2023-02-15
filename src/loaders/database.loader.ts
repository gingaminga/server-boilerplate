import RedisClient from "@databases/redis/client";
import { Container } from "typedi";

export const redisClient = Container.get(RedisClient);
