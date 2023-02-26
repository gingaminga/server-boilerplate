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
    test(`Should return null when parameter is normal string`, () => {
      const value = parseJSON("hihi");

      expect(value).toEqual(null);
    });

    test(`Should return number 10 when parameter is string 10`, () => {
      const value = parseJSON("10");

      expect(value).toBe(10);
    });

    test(`Should return json when parameter is stringify object`, () => {
      const stringifyData = JSON.stringify(data);
      const value = parseJSON<IData>(stringifyData);

      expect(value).toEqual(data);
    });
  });
});
