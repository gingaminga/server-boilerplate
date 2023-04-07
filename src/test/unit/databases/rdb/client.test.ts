import RelationDatabaseClient from "@/databases/rdb/client";
import relationDatabaseConfig from "@/databases/rdb/config";

describe("RDB test :)", () => {
  let relationDatabaseClient: RelationDatabaseClient;

  beforeEach(() => {
    relationDatabaseClient = new RelationDatabaseClient();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Method close", () => {
    test("Should throw error when RDB status is not normal", async () => {
      const error = new Error("Failure RDB disconnect");
      Object.defineProperty(relationDatabaseClient, "instance", {
        value: {
          destroy: jest.fn().mockRejectedValue(error),
        },
      });

      await expect(relationDatabaseClient.close()).rejects.toThrowError(error);
    });

    test("Should RDB disconnect success", async () => {
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

  describe("Method initialized", () => {
    test("Should throw error when RDB not connect", async () => {
      const error = new Error("Failure RDB connect");
      jest.spyOn(RelationDatabaseClient.prototype as any, "connect").mockRejectedValue(error);

      await expect(relationDatabaseClient.initialized(relationDatabaseConfig)).rejects.toThrowError(error);
    });

    test("Should RDB connect success", async () => {
      jest.spyOn(RelationDatabaseClient.prototype as any, "connect").mockResolvedValue(true);

      expect(async () => {
        await relationDatabaseClient.initialized(relationDatabaseConfig);
      }).not.toThrowError();
    });
  });
});
