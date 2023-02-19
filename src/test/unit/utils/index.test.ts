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
    test(`Should only return string`, () => {
      const test = "hihi";
      const value = parseJSON(test);

      expect(value).toEqual(test);
    });

    test(`Should return ${JSON.stringify(data)}`, () => {
      const stringifyData = JSON.stringify(data);
      const value = parseJSON<IData>(stringifyData);

      expect(value).toEqual(data);
    });
  });
});
