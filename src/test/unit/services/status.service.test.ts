import StatusService from "@services/status.service";

describe("Status service test :)", () => {
  let statusService: StatusService;

  beforeEach(() => {
    statusService = new StatusService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Method getServerStatus", () => {
    test("Should throw error when redis connection is bad", async () => {
      const error = new Error("Failure redis connect");
      Object.defineProperty(statusService, "redisClient", {
        value: {
          get: jest.fn().mockRejectedValue(error),
        },
      });

      await expect(statusService.getServerStatus()).rejects.toThrowError(error);
    });

    test("Should return false when redis value is null", async () => {
      Object.defineProperty(statusService, "redisClient", {
        value: {
          get: jest.fn().mockResolvedValue(null),
        },
      });

      const serverStatus = await statusService.getServerStatus();
      expect(serverStatus).not.toBeTruthy();
    });

    test("Should return false when server status is bad", async () => {
      Object.defineProperty(statusService, "redisClient", {
        value: {
          get: jest.fn().mockResolvedValue("bad"),
        },
      });

      const serverStatus = await statusService.getServerStatus();
      expect(serverStatus).not.toBeTruthy();
    });

    test("Should return true when server status is good", async () => {
      Object.defineProperty(statusService, "redisClient", {
        value: {
          get: jest.fn().mockResolvedValue("good"),
        },
      });

      const serverStatus = await statusService.getServerStatus();

      expect(serverStatus).toBeTruthy();
    });
  });

  describe("Method setServerStatus", () => {
    test("Should throw error when redis connection is bad", async () => {
      const error = new Error("Failure redis connect");
      Object.defineProperty(statusService, "redisClient", {
        value: {
          set: jest.fn().mockRejectedValue(error),
        },
      });

      await expect(statusService.setServerStatus(true)).rejects.toThrowError(error);
    });

    test("Should return true", async () => {
      Object.defineProperty(statusService, "redisClient", {
        value: {
          set: jest.fn().mockResolvedValue(undefined),
        },
      });

      const isSuccess = await statusService.setServerStatus(true);

      expect(isSuccess).toBeTruthy();
    });
  });
});
