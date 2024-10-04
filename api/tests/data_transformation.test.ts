import { expect, it, describe, jest } from "@jest/globals";

import { expected, input } from "../src/Data/json_data/transform_practice_data";
import {
  transformData,
  transformData3,
  transformZoneData,
} from "../src/Data/transform_data_script";

import expected_input_json from "../src/Data/json_data/expected_input.json";
import practice_input_json from "../src/Data/json_data/practice_input.json";
import { Container } from "../src/Data/mock_data";

const jsonInput = practice_input_json as any;
const jsonExpected: Container = expected_input_json;

describe("transformed data should === expected", () => {
  it("zone only", () => {
    expect(transformZoneData(input.EXPLORING["forest of glime"])).toEqual(
      expected.EXPLORING["forest of glime"]
    );
  });
  it("should whole object", () => {
    expect(transformData(input)).toEqual(expected);
  });
  it("whole object in json", () => {
    expect(transformData(jsonInput)).toEqual(jsonExpected);
  });
});
