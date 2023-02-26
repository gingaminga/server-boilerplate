import RedisClient from "@databases/redis/client";

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
    jest.spyOn(RedisClient.prototype as any, "isConnect").mockReturnValue(true);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Redis initialize test", () => {
    test("Should throw error when redis not connect", async () => {
      const error = new Error("Failure redis connect");
      jest.spyOn(RedisClient.prototype as any, "connect").mockRejectedValue(error);

      await expect(redisClient.initialized(connectionOptions)).rejects.toThrowError(error);
    });

    test("Should throw error when redis not connect", async () => {
      const error = new Error("Failure redis ping pong");
      jest.spyOn(RedisClient.prototype as any, "connect").mockImplementation(() => Promise.resolve());
      jest.spyOn(RedisClient.prototype as any, "checkStatus").mockRejectedValue(error);

      await expect(redisClient.initialized(connectionOptions)).rejects.toThrowError(error);
    });

    test("Should return void when redis connection is good", async () => {
      jest.spyOn(RedisClient.prototype as any, "connect").mockImplementation(() => Promise.resolve());
      jest.spyOn(RedisClient.prototype as any, "checkStatus").mockResolvedValue("PONG");

      expect(async () => {
        await redisClient.initialized(connectionOptions);
      }).not.toThrowError();
    });
  });

  describe("Redis close test", () => {
    test("Should throw error when redis status is not normal", async () => {
      const error = new Error("Failure redis disconnect ");
      Object.defineProperty(redisClient, "instance", {
        value: {
          disconnect: jest.fn().mockRejectedValue(error),
        },
      });

      await expect(redisClient.close()).rejects.toThrowError(error);
    });

    test("Should return void when redis status is normal", async () => {
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

  describe("Redis not connection", () => {
    test("Should throw error when use redis's skill", async () => {
      const error = new Error("redis error");
      Object.defineProperty(redisClient, "instance", {
        value: {
          del: jest.fn().mockRejectedValue(error),
          hDel: jest.fn().mockRejectedValue(error),
          hGet: jest.fn().mockRejectedValue(error),
          hSet: jest.fn().mockRejectedValue(error),
          get: jest.fn().mockRejectedValue(error),
          set: jest.fn().mockRejectedValue(error),
        },
      });

      await expect(redisClient.del(testKey)).rejects.toThrowError(error);
      await expect(redisClient.hdel(testKey, testField)).rejects.toThrowError(error);
      await expect(redisClient.hget(testKey, testField)).rejects.toThrowError(error);
      await expect(redisClient.hset(testKey, testField, testValue)).rejects.toThrowError(error);
      await expect(redisClient.get(testKey)).rejects.toThrowError(error);
      await expect(redisClient.set(testKey, testValue)).rejects.toThrowError(error);
    });
  });

  describe("Function get method", () => {
    // get method
    test("Should return empty string by get when return null of redis get method", async () => {
      Object.defineProperty(redisClient, "instance", {
        value: {
          get: jest.fn().mockResolvedValue(null),
        },
      });

      const value = await redisClient.get(testKey);

      expect(value).toEqual("");
    });

    test(`Should return ${testValue} value by get when redis status is normal`, async () => {
      Object.defineProperty(redisClient, "instance", {
        value: {
          get: jest.fn().mockResolvedValue(testValue),
        },
      });
      const value = await redisClient.get(testKey);

      expect(value).toEqual(testValue);
    });

    // hget method
    test("Should return empty string by hget when return undefined of redis hGet method", async () => {
      Object.defineProperty(redisClient, "instance", {
        value: {
          hGet: jest.fn().mockResolvedValue(undefined),
        },
      });

      const value = await redisClient.hget(testKey, testField);

      expect(value).toEqual("");
    });

    test(`Should return ${testValue} value by hget when redis status is normal`, async () => {
      Object.defineProperty(redisClient, "instance", {
        value: {
          hGet: jest.fn().mockResolvedValue(testValue),
        },
      });

      const value = await redisClient.hget(testKey, testField);

      expect(value).toEqual(testValue);
    });
  });

  describe("Function set method", () => {
    // set method
    test("Should throw error by set when return null of redis set method", async () => {
      const error = new Error("Not connect redis.. :(");
      Object.defineProperty(redisClient, "instance", {
        value: {
          set: jest.fn().mockResolvedValue(null),
        },
      });

      await expect(redisClient.set(testKey, testValue)).rejects.toThrowError(error);
    });

    test(`Should return void by set when redis status is normal`, () => {
      Object.defineProperty(redisClient, "instance", {
        value: {
          set: jest.fn().mockResolvedValue("OK"),
        },
      });

      expect(async () => {
        await redisClient.set(testKey, testValue);
      }).not.toThrowError();
    });

    test(`Should return void when redis status is normal`, () => {
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

  describe("Function del method", () => {
    // del method
    test(`Should return void when redis status is normal`, () => {
      Object.defineProperty(redisClient, "instance", {
        value: {
          del: jest.fn().mockResolvedValue(1),
        },
      });

      expect(async () => {
        await redisClient.del(testKey);
      }).not.toThrowError();
    });

    // hdel method
    test(`Should return void when redis status is normal`, () => {
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
});
