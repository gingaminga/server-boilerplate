import RelationDatabaseClient from "@databases/rdb/client";
import relationDatabaseConfig from "@databases/rdb/config";

describe("RDB test :)", () => {
  let relationDatabaseClient: RelationDatabaseClient;

  beforeEach(() => {
    relationDatabaseClient = new RelationDatabaseClient();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("RDB initialize test", () => {
    test("Should throw error when rdb not connect", async () => {
      const error = new Error("Failure rdb connect");
      jest.spyOn(RelationDatabaseClient.prototype as any, "connect").mockRejectedValue(error);

      await expect(relationDatabaseClient.initialized(relationDatabaseConfig)).rejects.toThrowError(error);
    });

    test("Should return void when rdb connection is good", async () => {
      jest.spyOn(RelationDatabaseClient.prototype as any, "connect").mockResolvedValue(true);

      expect(async () => {
        await relationDatabaseClient.initialized(relationDatabaseConfig);
      }).not.toThrowError();
    });
  });

  describe("RDB close test", () => {
    test("Should throw error when rdb status is not normal", async () => {
      const error = new Error("Failure rdb disconnect ");
      Object.defineProperty(relationDatabaseClient, "instance", {
        value: {
          destroy: jest.fn().mockRejectedValue(error),
        },
      });

      await expect(relationDatabaseClient.close()).rejects.toThrowError(error);
    });

    test("Should return void when rdb status is normal", async () => {
      Object.defineProperty(relationDatabaseClient, "instance", {
        value: {
          destroy: jest.fn().mockImplementation(() => Promise.resolve()),
        },
      });

      expect(async () => {
        await relationDatabaseClient.close();
      }).not.toThrowError();
    });
  });
});
