import { expect, it, describe, jest } from "@jest/globals";

import { expected, input } from "../src/Data/json_data/transform_practice_data";
import {
  transformData,
  transformData3,
  transformZoneData,
} from "../src/Data/transform_data_script";

describe("transformed data should === expected", () => {
  it("should return expected", () => {
    expect(transformZoneData(input.EXPLORING["forest of glime"])).toEqual(
      expected.EXPLORING["forest of glime"]
    );
  });
  it("should return expected", () => {
    expect(transformData(input)).toEqual(expected);
  });
});
