import { parseJSON } from "@utils/index";

interface IData {
  a: number;
  b: number;
}

const data: IData = {
  a: 10,
  b: 20,
};

describe("Util function test :)", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Function parseJSON", () => {
    test(`Should return null when parsing is not good v1`, () => {
      const value = parseJSON("hihi");

      expect(value).toEqual(null);
    });

    test(`Should return null when parsing is not good v2`, () => {
      const value = parseJSON("{data: 1}");

      expect(value).toBe(null);
    });

    test(`Should return ${JSON.stringify(data)}`, () => {
      const stringifyData = JSON.stringify(data);
      const value = parseJSON<IData>(stringifyData);

      expect(value).toEqual(data);
    });
  });
});
