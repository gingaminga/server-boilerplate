import RedisClient from "@/databases/redis/client";

const testKey = "test-key";
const testField = "testField";
const testValue = "testValue";
const connectionOptions = {
  host: "",
  password: "",
  port: 6379,
};

describe("Database redis test :)", () => {
  let redisClient: RedisClient;

  beforeEach(() => {
    redisClient = new RedisClient();
    jest.spyOn(RedisClient.prototype as any, "isConnect").mockImplementation(() => null);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Method close", () => {
    test("Should throw error when redis status is not normal", async () => {
      const error = new Error("Failure redis disconnect");
      Object.defineProperty(redisClient, "instance", {
        value: {
          disconnect: jest.fn().mockRejectedValue(error),
        },
      });

      await expect(redisClient.close()).rejects.toThrowError(error);
    });

    test("Should processed normally", async () => {
      Object.defineProperty(redisClient, "instance", {
        value: {
          disconnect: jest.fn().mockImplementation(() => Promise.resolve()),
        },
      });

      expect(async () => {
        await redisClient.close();
      }).not.toThrowError();
    });
  });

  describe("Method del", () => {
    test(`Should throw error when redis not normal`, async () => {
      const error = new Error("Redis error");
      Object.defineProperty(redisClient, "instance", {
        value: {
          del: jest.fn().mockRejectedValue(error),
        },
      });

      await expect(redisClient.del(testKey)).rejects.toThrowError(error);
    });

    test(`Should delete success`, () => {
      Object.defineProperty(redisClient, "instance", {
        value: {
          del: jest.fn().mockResolvedValue(1),
        },
      });

      expect(async () => {
        await redisClient.del(testKey);
      }).not.toThrowError();
    });
  });

  describe("Method get", () => {
    test(`Should throw error when redis not normal`, async () => {
      const error = new Error("Redis error");
      Object.defineProperty(redisClient, "instance", {
        value: {
          get: jest.fn().mockRejectedValue(error),
        },
      });

      await expect(redisClient.get(testKey)).rejects.toThrowError(error);
    });

    test("Should return null when has no value", async () => {
      Object.defineProperty(redisClient, "instance", {
        value: {
          get: jest.fn().mockResolvedValue(null),
        },
      });

      const value = await redisClient.get(testKey);

      expect(value).toBeNull();
    });

    test(`Should return ${testValue} value`, async () => {
      Object.defineProperty(redisClient, "instance", {
        value: {
          get: jest.fn().mockResolvedValue(testValue),
        },
      });

      const value = await redisClient.get(testKey);

      expect(value).toEqual(testValue);
    });
  });

  describe("Method hdel", () => {
    test(`Should throw error when redis not normal`, async () => {
      const error = new Error("Redis error");
      Object.defineProperty(redisClient, "instance", {
        value: {
          hDel: jest.fn().mockRejectedValue(error),
        },
      });

      await expect(redisClient.hdel(testKey, testField)).rejects.toThrowError(error);
    });

    test(`Should delete success`, () => {
      Object.defineProperty(redisClient, "instance", {
        value: {
          hDel: jest.fn().mockResolvedValue(1),
        },
      });

      expect(async () => {
        await redisClient.hdel(testKey, testField);
      }).not.toThrowError();
    });
  });

  describe("Method hget", () => {
    test(`Should throw error when redis not normal`, async () => {
      const error = new Error("Redis error");
      Object.defineProperty(redisClient, "instance", {
        value: {
          hGet: jest.fn().mockRejectedValue(error),
        },
      });

      await expect(redisClient.hget(testKey, testField)).rejects.toThrowError(error);
    });

    test("Should return null when has no value", async () => {
      Object.defineProperty(redisClient, "instance", {
        value: {
          hGet: jest.fn().mockResolvedValue(undefined),
        },
      });

      const value = await redisClient.hget(testKey, testField);

      expect(value).toBeNull();
    });

    test(`Should return ${testValue} value`, async () => {
      Object.defineProperty(redisClient, "instance", {
        value: {
          hGet: jest.fn().mockResolvedValue(testValue),
        },
      });

      const value = await redisClient.hget(testKey, testField);

      expect(value).toEqual(testValue);
    });
  });

  describe("Method hset", () => {
    test(`Should throw error when redis not normal`, async () => {
      const error = new Error("Redis error");
      Object.defineProperty(redisClient, "instance", {
        value: {
          hSet: jest.fn().mockRejectedValue(error),
        },
      });

      await expect(redisClient.hset(testKey, testField, testValue)).rejects.toThrowError(error);
    });

    test(`Should set success`, () => {
      Object.defineProperty(redisClient, "instance", {
        value: {
          hSet: jest.fn().mockResolvedValue("OK"),
        },
      });

      expect(async () => {
        await redisClient.hset(testKey, testField, testValue);
      }).not.toThrowError();
    });
  });

  describe("Method initialized", () => {
    test("Should throw error when redis not connect", async () => {
      const error = new Error("Failure redis connect");
      jest.spyOn(RedisClient.prototype as any, "connect").mockRejectedValue(error);

      await expect(redisClient.initialized(connectionOptions)).rejects.toThrowError(error);
    });

    test("Should throw error when check redis status", async () => {
      const error = new Error("Failure check redis status");
      jest.spyOn(RedisClient.prototype as any, "connect").mockImplementation(() => Promise.resolve());
      jest.spyOn(RedisClient.prototype as any, "checkStatus").mockRejectedValue(error);

      await expect(redisClient.initialized(connectionOptions)).rejects.toThrowError(error);
    });

    test("Should processed normally", async () => {
      jest.spyOn(RedisClient.prototype as any, "connect").mockImplementation(() => Promise.resolve());
      jest.spyOn(RedisClient.prototype as any, "checkStatus").mockResolvedValue("PONG");

      expect(async () => {
        await redisClient.initialized(connectionOptions);
      }).not.toThrowError();
    });
  });

  describe("Method set", () => {
    test(`Should throw error when redis not normal`, async () => {
      const error = new Error("Redis error");
      Object.defineProperty(redisClient, "instance", {
        value: {
          set: jest.fn().mockRejectedValue(error),
        },
      });

      await expect(redisClient.set(testKey, testValue)).rejects.toThrowError(error);
    });

    test(`Should set success`, () => {
      Object.defineProperty(redisClient, "instance", {
        value: {
          set: jest.fn().mockResolvedValue("OK"),
        },
      });

      expect(async () => {
        await redisClient.set(testKey, testValue);
      }).not.toThrowError();
    });
  });
});
